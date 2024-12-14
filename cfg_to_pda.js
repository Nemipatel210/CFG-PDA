function convertCfgToPda() {
    const nontermStatesInput = document.getElementById('nontermStates').value.trim();
    const termStatesInput = document.getElementById('termStates').value.trim();
    const productionsInput = document.getElementById('productions').value.trim();

    const nontermStates = nontermStatesInput.split(' ');
    const termStates = termStatesInput.split(' ');
    const productions = productionsInput.split('\n');

    let pdaResult = "";
    pdaResult += "<h2>PDA Result:</h2>";
    pdaResult += "<p>Non-terminal States: " + nontermStates.join(", ") + "</p>";
    pdaResult += "<p>Terminal States: " + termStates.join(", ") + "</p>";
    pdaResult += "<p>Production Rules:</p>";

    // Add start state production
    pdaResult += "<p>δ(q0,ε,z) = (q," + nontermStates[0] + "Z)</p>";

    productions.forEach(production => {
        const [left, right] = production.split("->").map(str => str.trim());
        const transitionRule = `δ(q,ε,${left}) = { (q,${right}) }`;
        pdaResult += "<p>" + transitionRule + "</p>";
    });

    // Add individual terminal transition rules
    termStates.forEach(terminal => {
        const transitionRule = `δ(q,${terminal},${terminal}) = (q,ε)`;
        pdaResult += "<p>" + transitionRule + "</p>";
    });

    // Add end state production
    pdaResult += "<p>δ(q,ε,z) = (qf,ε)</p>";

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = pdaResult;
}
