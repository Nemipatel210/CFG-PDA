#include <iostream>
#include <sstream>
#include <vector>

#define breakline() cout << "-------------------------------------------------------------------------\n"
using namespace std;

void CFG_to_PDA(vector<pair<string, vector<string>>> &gram, vector<string> &nonterm_states, vector<string> &term_states, string start_state) {
    int i, j;
    cout << "Grammar given as input :\n";
    cout << "Start State : " << start_state << endl;
    cout << "Non Terminal States : \n";
    for (i = 0; i < nonterm_states.size(); i++) {
        cout << nonterm_states[i] << "  ";
    }
    cout << endl;
    cout << "Terminal States : \n";
    for (i = 0; i < term_states.size(); i++) {
        cout << term_states[i] << "  ";
    }
    cout << endl;
    cout << "Production Rule :\n";
    vector<string> t;
    for (i = 0; i < gram.size(); i++) {
        cout << gram[i].first << " -> ";
        t = gram[i].second;
        cout << t[0];
        for (j = 1; j < t.size(); j++) {
            cout << " | " << t[j];
        }
        cout << endl;
    }
    breakline();

    cout << "\nCorresponding PDA :\n";
    cout << "δ(q0,ε,z) = (q," << start_state << "Z)" << endl; // PDA start production
    for (i = 0; i < gram.size(); i++) {
        cout << "δ(q,ε," << gram[i].first << ") = { (q,";
        t = gram[i].second;
        cout << t[0] << ")";
        for (j = 1; j < t.size(); j++) {
            cout << " , (q," << t[j] << ")";
        }
        cout << " }" << endl;
    }
    cout << "δ(q,ε,z) = (qf,ε)" << endl; // PDA end production
    cout << endl;
    for (i = 0; i < term_states.size(); i++) {
        cout << "δ(q," << term_states[i] << "," << term_states[i] << ") = (q,ε)" << endl;
    }
}

int main() {
    vector<pair<string, vector<string>>> gram;
    vector<string> nonterm_states;
    vector<string> term_states;

    int i, j;
    string start_state = "";
    string line, ch, state;

    cout << "Enter non-terminal states separated by spaces (example: NT = S A B X Y): ";
    getline(cin, line);
    istringstream ss(line);
    while (ss >> ch) {
        if (ch == "=") break;
        if (ch != "NT") {
            nonterm_states.push_back(ch);
        }
    }
    start_state = nonterm_states[0];

    cout << "Enter terminal states separated by spaces (example: T = a b c d): ";
    getline(cin, line);
    istringstream sst(line);
    while (sst >> ch) {
        if (ch == "=") break;
        if (ch != "T") {
            term_states.push_back(ch);
        }
    }

    cout << "Enter production rules (press Enter after each rule, type 'done' to finish):\n";

    while (true) {
        cout << "Production Rule: ";
        getline(cin, line);
        if (line == "done") break;

        istringstream ssr(line);
        ssr >> state;
        vector<string> temp;
        while (ssr >> ch) {
            if (ch != "->" && ch != "|") {
                temp.push_back(ch);
            }
        }
        gram.push_back(make_pair(state, temp));
    }

    CFG_to_PDA(gram, nonterm_states, term_states, start_state);

    return 0;
}
