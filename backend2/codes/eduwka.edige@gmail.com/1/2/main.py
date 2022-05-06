#include <bits/stdc++.h>

using namespace std;
int a[5000][5000];
int main() {
	long long i, j, x1, z, x2, y1, y2, s, n, w, h;
	cin >> w >> h;
	cin >> n;
	s = w * h;
	for(z = 1; z <= n; z++) {
		cin >> x1 >> y1 >> x2 >> y2;
//		if(x1 == 1) x1++;
//		if(y1 == 1) y1++;
		for(i = x1 + 1; i <= x2; i++) {
			for(j = y1 + 1; j <= y2; j++) {
				if(a[i][j] != 1) {
					a[i][j] = 1;
					s--;
				}
			}
		}
	}
	cout << s;
}