#include<bits/stdc++.h>
#include<string>
using namespace std;
int dec2bin(int num)
{
    int bin = 0, k = 1;

    while (num)
    {
        bin += (num % 2) * k;
        k *= 10;
        num /= 2;
    }

    return bin;
}

int main()
{
    unsigned long long num, g=0;
    cin>>num;
unsigned long long dec=dec2bin(num);
stringstream ss;
ss << dec;
string str = ss.str();
for(int i=0;i<str.length();i++)
{
if(str[i]=='1') g++;
}
cout<<g;
}
