a, b=map(int, input().split())
n=int(input())
d=[]
e=[]

for i in range(n):
    x1,y1, x2,y2=map(int,input().split())
    c=(x2-x1)* (y2-y1)
    e.append(c)
    d.append(x1)    
    d.append(y1)
    d.append(x2)
    d.append(y2)
for i in range (len(d)):
    if d[3]>d[5]:
        s=e[0]+e[1]-1
        t=a*b-s
print(t)