#include <iostream>
#include <vector>

using namespace std;

bool compareRange(const pair<int, int>& a, const pair<int, int>& b) {
    return a.first < b.first || (a.first == b.first && a.second < b.second);
}

bool intersect(const pair<int, int>& a, const pair<int, int>& b) {
    return (a.first <= b.first && a.second >= b.first) || (b.first <= a.first && b.second >= a.first);
}

int main() {
    int n;
    cin >> n;
    
    vector<pair<int, int> > ranges(n);
    
    for (int i = 0; i < n; ++i) {
        cin >> ranges[i].first >> ranges[i].second;
    }
    
    sort(ranges.begin(), ranges.end(), compareRange);
    
    int lastLesson = 0;
    int counter = 1;
    
    for (int i = 1; i < n; ++i) {
        if (intersect(ranges[lastLesson], ranges[i])) {
            if (ranges[lastLesson].second > ranges[i].second) {
                lastLesson = i;
            }
        } else {
            counter++;
            lastLesson = i;
        }
    }

    cout << counter << '\n';
    
    return 0;
}