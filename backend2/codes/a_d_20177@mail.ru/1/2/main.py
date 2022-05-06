n,m=map(int,input().split(' '))
a,s,l=list(),list(),0
for i in range(n):
    a.append([0]*m)
q=int(input())
for i in range(q):
    s.append(list(map(int,input().split(' '))))
for i in range(q):
    print(i)
    for j in range(s[i][1]-1,s[i][3]-1):
        if i==2:
            print('q')
        for k in range(s[i][0]-1,s[i][2]-1):
            if a[j][k]!=1:
                a[j][k]=1
                l+=1
print(n*m-l)
