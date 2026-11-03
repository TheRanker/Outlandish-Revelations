"""Small standard-library NBT codec used for structure generation and inspection."""
import gzip
import io
import struct

def loads(data):
    stream = io.BytesIO(gzip.decompress(data) if data[:2] == b'\x1f\x8b' else data)
    def number(fmt):
        return struct.unpack('>'+fmt, stream.read(struct.calcsize('>'+fmt)))[0]
    def string():
        return stream.read(number('H')).decode('utf-8')
    def payload(kind):
        if kind in range(1,7): return number({1:'b',2:'h',3:'i',4:'q',5:'f',6:'d'}[kind])
        if kind == 8: return string()
        if kind == 9:
            subtype, length = number('b'), number('i')
            return subtype, [payload(subtype) for _ in range(length)]
        if kind == 10:
            result = {}
            while True:
                subtype = number('b')
                if subtype == 0: return result
                name = string()
                result[name] = (subtype, payload(subtype))
        if kind in (7,11,12):
            return [number({7:'b',11:'i',12:'q'}[kind]) for _ in range(number('i'))]
        raise ValueError(kind)
    kind = number('b')
    name = string()
    return name, payload(kind)

def dumps(root):
    def string(value):
        data = value.encode('utf-8')
        return struct.pack('>H', len(data))+data
    def payload(kind, value):
        if kind in range(1,7): return struct.pack('>'+{1:'b',2:'h',3:'i',4:'q',5:'f',6:'d'}[kind],value)
        if kind == 8: return string(value)
        if kind == 9:
            subtype, items = value
            return struct.pack('>bi',subtype,len(items))+b''.join(payload(subtype,v) for v in items)
        if kind == 10:
            return b''.join(bytes([t])+string(n)+payload(t,v) for n,(t,v) in value.items())+b'\0'
        if kind in (7,11,12):
            return struct.pack('>i',len(value))+b''.join(struct.pack('>'+{7:'b',11:'i',12:'q'}[kind],v) for v in value)
        raise ValueError(kind)
    return gzip.compress(b'\x0a\x00\x00'+payload(10,root),mtime=0)
