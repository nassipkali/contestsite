#include <iostream>
using namespace std;
int main(){
	long n, r, t=0;
	cin >> n;
	while(n>=1){
		r=n%2;
		n=(n-r)/2;
		if(r==1) t++;
	}
	cout<<t;
}