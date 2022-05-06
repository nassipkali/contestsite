#include<iostream>
using namespace std;
main()
{
int n,a=0;
cin>>n;
while(n)
{
	a+=n%2;
	n/=2;
}
cout<<a;
}