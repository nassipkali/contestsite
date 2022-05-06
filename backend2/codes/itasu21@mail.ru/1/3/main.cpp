#include<iostream>
#include<stdio.h>
#include<algorithm>
#include<math.h>
using namespace std;
#define maxn 500005
struct node
{
    int l,r;
};
bool cmp(node a,node b)
{
    if(a.r==b.r)return a.l<b.l;
    return a.r<b.r;
}
node p[maxn];
int main()
{
    int n;scanf("%d",&n);
    for(int i=0;i<n;i++)
        scanf("%d%d",&p[i].l,&p[i].r);
    sort(p,p+n,cmp);
    int ans = 0;
    int last = -1;
    for(int i=0;i<n;i++)
    {
        if(p[i].l>last)
        {
            ans++;
            last = p[i].r;
        }
    }
    printf("%d\n",ans);
}