"""Small classfile member reader for offline native linkage and side-boundary audits."""
import io

class ClassFile:
    def __init__(self,data):
        f=io.BytesIO(data)
        def u(n):return int.from_bytes(f.read(n),'big')
        assert u(4)==0xcafebabe
        f.read(4);self.cp=[None]*u(2);i=1
        while i<len(self.cp):
            tag=u(1)
            if tag==1:self.cp[i]=f.read(u(2)).decode('utf-8','replace')
            elif tag in (7,8,16,19,20):self.cp[i]=(tag,u(2))
            elif tag in (9,10,11,12,17,18):self.cp[i]=(tag,u(2),u(2))
            elif tag in (3,4):f.read(4)
            elif tag in (5,6):f.read(8);i+=1
            elif tag==15:self.cp[i]=(tag,u(1),u(2))
            else:raise ValueError(tag)
            i+=1
        self.access=u(2);self.name=self.resolve(u(2));parent=u(2)
        self.parents=([self.resolve(parent)] if parent else [])+[self.resolve(u(2)) for _ in range(u(2))]
        self.fields=set();self.methods=set()
        for section in [self.fields,self.methods]:
            for _ in range(u(2)):
                access=u(2);name=self.resolve(u(2));desc=self.resolve(u(2));section.add((name,desc))
                for _ in range(u(2)):u(2);f.read(u(4))
    def resolve(self,i):
        v=self.cp[i]
        if isinstance(v,str):return v
        if v is None:return ''
        if v[0] in (7,8):return self.resolve(v[1])
        if v[0]==12:return self.resolve(v[1]),self.resolve(v[2])
        raise ValueError(v)
    def references(self):
        for v in self.cp:
            if isinstance(v,tuple) and v[0] in (9,10,11):
                name,desc=self.resolve(v[2]);yield v[0],self.resolve(v[1]),name,desc
