#include <bits/stdc++.h>

using namespace std;

int main() {
	long long n, sum_1 = 0;
	cin >> n;
	while(n != 1) {
		if(n % 2 == 1) sum_1++;
		if(n / 2 == 1) sum_1++;
		n /= 2;
	}
	cout << sum_1;
}