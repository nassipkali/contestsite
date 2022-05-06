#include <stdio.h>
#include <iostream>
using namespace std;
int main(){
    int n, s, c = 0;
        cin>>n;
        s=n;
        while(n){
        s=n%2;
        if(s==1) c++;
        n/=2;
    };
    cout<<c++<<endl;
    return 0;
}