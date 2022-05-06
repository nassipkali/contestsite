#include<iostream>
using namespace std;
int main()
{
	int a,s,d,h=0;
	cin>>a;
	if(!(0<=a && a<=1000000)) 
	{
		cout<<"error";
		goto a;
	}
	s=a;
	 while(s)
	{
		d=s%2;
		s=s/2;
		cout<<d;
		if(d==1)h++;
	}
	cout<<"\n"<<h;
	a:;
}