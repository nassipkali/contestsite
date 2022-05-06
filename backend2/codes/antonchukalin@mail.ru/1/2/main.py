#include<iostream>
using namespace std;
int a[100][100];main()
{
freopen("input.txt","r",stdin);
long w,h,n,i,j,k,x1,y1,x2,y2,s=0;
cin>>w>>h>>n;
for(i=0;i<n;++i)
{
cin>>x1>>y1>>x2>>y2;
for(j=x1;j<x2;++j)
for(k=y1;k<y2;++k)
if(a[j][k]==0)
{
	s++;a[j][k]=1;}}
cout<<w*h-s;
}