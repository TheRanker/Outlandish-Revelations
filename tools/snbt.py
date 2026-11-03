"""Read FTB's text SNBT (including comma-optional lists) and retain edit spans."""
import json
import re

class Parser:
    def __init__(self,text): self.text=text; self.i=0; self.spans={}
    def skip(self):
        while self.i<len(self.text):
            if self.text[self.i].isspace() or self.text[self.i]==',': self.i+=1
            elif self.text.startswith('//',self.i):
                end=self.text.find('\n',self.i); self.i=len(self.text) if end<0 else end+1
            elif self.text.startswith('/*',self.i):
                end=self.text.find('*/',self.i+2)
                if end<0: raise ValueError('Unclosed comment')
                self.i=end+2
            else: break
    def quoted(self):
        if self.text[self.i]=='"':
            result,end=json.JSONDecoder().raw_decode(self.text,self.i)
            self.i=end; return result
        self.i+=1; result=''
        while self.i<len(self.text):
            c=self.text[self.i]; self.i+=1
            if c=="'": return result
            if c=='\\': c=self.text[self.i]; self.i+=1
            result+=c
        raise ValueError('Unclosed quoted string')
    def value(self,path=()):
        self.skip(); start=self.i; c=self.text[self.i]
        if c=='{':
            self.i+=1; result={}
            while True:
                self.skip()
                if self.text[self.i]=='}': self.i+=1; break
                if self.text[self.i] in '\"\'': key=self.quoted()
                else:
                    m=re.match(r'[^\s:]+',self.text[self.i:])
                    if not m: raise ValueError(f'Missing key at {self.i}')
                    key=m[0]; self.i+=len(key)
                self.skip()
                if self.text[self.i]!=':': raise ValueError(f'Missing colon at {self.i}')
                self.i+=1
                if key in result: raise ValueError('Duplicate key '+key)
                result[key]=self.value(path+(key,))
        elif c=='[':
            self.i+=1; result=[]; self.skip()
            if re.match(r'[BIL];',self.text[self.i:],re.I): self.i+=2
            while True:
                self.skip()
                if self.text[self.i]==']': self.i+=1; break
                result.append(self.value(path+(len(result),)))
        elif c in '\"\'': result=self.quoted()
        else:
            m=re.match(r'[^\s,\]}]+',self.text[self.i:])
            if not m: raise ValueError(f'Unexpected token at {self.i}')
            token=m[0]; self.i+=len(token)
            if token in ('true','false'): result=token=='true'
            elif re.fullmatch(r'[-+]?\d+[bBsSlL]?',token): result=int(token.rstrip('bBsSlL'))
            elif re.fullmatch(r'[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?[fFdD]?',token): result=float(token.rstrip('fFdD'))
            else: result=token
        self.spans[path]=(start,self.i)
        return result
    def parse(self):
        result=self.value(); self.skip()
        if self.i!=len(self.text): raise ValueError(f'Trailing text at {self.i}')
        return result

def load(path):
    parser=Parser(path.read_text(encoding='utf-8-sig'))
    return parser.parse(),parser
