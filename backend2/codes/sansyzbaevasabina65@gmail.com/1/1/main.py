n=int(input())
a=bin(n)
b=a[2:]
k=0
s=len(b)
for i in range (s):
    if b[i]=="1":
        k+=1
print(k)
