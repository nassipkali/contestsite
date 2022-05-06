n=int(input())
k=0
s=[]
d=[]
for i in range(n):
  a,b=map(int,input().split())
  s.append(a)
  d.append(b)
for i in range (n-1):
  if d[i]==s[i+1] :
    k+=1
if (k==0):
  print(n)
else :
    if k%2==0:
        print((k//2)+1)
    else :
        print(k//2)