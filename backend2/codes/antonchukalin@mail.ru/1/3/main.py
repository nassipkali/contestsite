#include<iostream>
using namespace std;
int main(){
	int n, i, j, s=1;
	int a[1000], b[1000];
	cin>>n;
	for(i=0; i<n; i++){
		cin>>a[i]>>b[i];
	}
	for(i=0; i<n-1; i++){
		for(j=1; j<n; j++){
			if(b[i]<a[j] && 9<=a[i] && a[i]<=b[i] && a[j]<=b[j] && b[j]<=19){
				s++;
				i=j;
			}
		}
	}
	cout<<s;
}