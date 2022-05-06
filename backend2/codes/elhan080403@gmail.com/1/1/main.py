#include <iostream>
using namespace std;
int main()
{unsigned n,no,nz; 
while (cin>>n&&n) {
for(no=0,nz=0;n>0;n>>= 1)
(n&1)?no++:nz++;
cout<<no<<endl;
}
}