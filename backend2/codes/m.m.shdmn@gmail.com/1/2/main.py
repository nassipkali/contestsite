#include<bits/stdc++.h>
#include<string>
using namespace std;
	unsigned long long n, m, g;
int main()
{
	unsigned long long x1,y1,x2,y2;
	cin>>n>>m;
	unsigned long long dec[n+1][m+1];
	unsigned long long a;
	cin>>a;
	for(int i=1;i<=n;i++)
	{
		for(int j=1;j<=m;j++)
		{
			dec[i][j]==0;
		}
	}
	for(int i=1;i<=a;i++)
	{
		cin>>x1>>y1>>x2>>y2;
		for(int j=x1;j<=x2-1;j++)
		{
			for(int k=y1;k<=y2-1;k++)
			{
				if(dec[j][k]!=1)
				{
					dec[j][k]=1;
					g++;
				}
			}
		}
	}
	cout<<n*m-g;
}