#include<fstream>
using namespace std;
int main()
{
	int w,h,n,x1,x2,y1,y2,s=0;
	ifstream f;
	f.open("INPUT.txt");
	ofstream f1;
	f1.open("OUTPUT.txt");
	f>>w>>h>>n;
	int a[w][h];
	for(int i=0;i<w;i++)
	for(int j=0;j<h;j++)
	a[i][j]=0;
	for(int i=0;i<n;i++)
	{
		f>>x1>>y1>>x2>>y2;
		for(int j=0;j<w;j++)
		{
			for(int m=0;m<h;m++)
			{
				if(x1<=j && x2>=j && y1<=m && y2>=m )
				{
					a[j][m]=1;
					s++;
				}
				else if(a[j][m]==1) a[j][m]=1;
				else a[j][m]=0;
			}
		}
	}
	f1<<s;
	f.close();
	f1.close();
}