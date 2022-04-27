function createTable() {

    let elemento_pai = document.getElementById('table1');
    elemento_pai.innerText = 'Matriz A';
    let table = document.createElement('table');
    table.setAttribute('id', 'matrizA')
    elemento_pai.appendChild(table)
    let ordem = document.getElementById('ordem').value;

    for (let i = 0; i < ordem; i++) {
        let row = document.createElement('tr');
        table.appendChild(row)

        for (let j = 0; j < ordem; j++) {
            let column = document.createElement('td');
            let input = document.createElement('input')
            row.appendChild(column);
            column.appendChild(input);
            input.setAttribute('id', 'a' + i + j)
        }
    }

    elemento_pai = document.getElementById('table2');
    elemento_pai.innerText = 'Matriz B';
    table = document.createElement('table');
    elemento_pai.appendChild(table);
    table.setAttribute('id', 'matrizB');

    for (let i = 0; i < ordem; i++) {
        let row = document.createElement('tr');
        table.appendChild(row)

        for (let j = 0; j < ordem; j++) {
            let column = document.createElement('td');
            let input = document.createElement('input')
            row.appendChild(column);
            column.appendChild(input);
            input.setAttribute('id', 'b' + i + j)
        }
    }
}

function ops() {
    var op = parseInt(document.getElementById('op').value);
    var ordem = document.getElementById('ordem').value;

    var a = [];
    var b = [];

    for (var i = 0; i < ordem; i++) {
        a[i] = [];
        for (var j = 0; j < ordem; j++) {
            if (document.getElementById('a' + i + j).value == '') {
                alert('PREENCHA TODOS OS CAMPOS');
                return;
            }
            a[i][j] = parseInt(document.getElementById('a' + i + j).value);
        }
    }

    for (var i = 0; i < ordem; i++) {
        b[i] = [];
        for (var j = 0; j < ordem; j++) {
            if(document.getElementById('b' + i + j) == '' && (op !== 1 || op !== 2)){
                alert('PREENCHA TODOS OS CAMPOS')
                return;
            }
            b[i][j] = parseInt(document.getElementById('b' + i + j).value);
            
        }
    }

    switch (op) {
        case 1:
            console.log(det(a))
            resultado(det(a));
            break;
        case 2:
            console.log(inversa(a, det(a)));
            resultado(inversa(a, det(a)));
            break;
        case 3:
            resultado(soma(a, b));
            break;
        case 4:
            resultado(sub(a, b))
            break;
        case 5:
            resultado(mult(a, b))
            break;
    }
}

function inversa(a, det) {
    var cofA = [];
    var cofInv = [];

    for (var i = 0; i < a.length; i++) {
        cofA[i] = [];
        for (var j = 0; j < a.length; j++) {
            cofA[i][j] = cof(a, j, i)
        }
    }

    for (var i = 0; i < a.length; i++) {
        cofInv[i] = [];
        for (var j = 0; j < a.length; j++) {
            cofInv[i][j] = (cofA[j][i] / det).toFixed(3);
        }
    }
    return (cofInv);
}

function det(a) {

    let ordem = a.length;
    if (ordem == 1) return a[0][0];
    if (ordem == 2) return (a[0][0] * a[1][1]) - (a[0][1] * a[1][0]);
    let det = 0;
    for (let j = 0; j < a.length; j++) {
        det += a[0][j] * cof(a, j, 0);
    }

    return det;
}

function cof(a, col, lin) {
    var menor = [];
    var k = 0;
    ordem = a.length;

    if (lin == ordem - 1) {
        for (var i = 0; i < ordem - 1; i++) {
            menor[i] = [];
            for (var j = 0; j < ordem; j++) {
                if (j !== col) {
                    menor[k].push(a[i][j]);
                }
            }
            k++;
        }
    } else {

        for (var i = 0; i < ordem; i++) {
            menor[k] = [];
            if (i !== lin) {
                for (var j = 0; j < ordem; j++) {
                    if (j !== col) {
                        menor[k].push(a[i][j]);
                    }
                }
                k++;
            }
        }
    }
    return (Math.pow(-1, lin + col) * det(menor))
}

function soma(a, b) {
    var resultado = [];
    for (var i = 0; i < a.length; i++) {
        resultado[i] = [];
        for (var j = 0; j < a.length; j++) {
            resultado[i][j] = (a[i][j] + b[i][j]);
        }
    }
    return resultado;
}

function sub(a, b) {
    var resultado = [];
    for (var i = 0; i < a.length; i++) {
        resultado[i] = [];
        for (var j = 0; j < a.length; j++) {
            resultado[i][j] = (a[i][j] - b[i][j]);
        }
    }
    return resultado;
}

function mult(a, b) {
    var resultado = [];
    for (var i = 0; i < a.length; i++) {
        resultado[i] = [];
        for (var j = 0; j < a.length; j++) {
            resultado[i][j] = 0;
            for (var k = 0; k < a.length; k++) {
                resultado[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return resultado;
}

function resultado(a) {
    
    var elemento_pai = document.getElementById('result');
    var table = document.getElementById('tableResult');
    table.remove();

    table = document.createElement('table');

    elemento_pai.innerText = 'Resultado: ';   
    elemento_pai.appendChild(table);

    table.setAttribute('id', 'tableResult')
    var ordem = a.length;

    if (Array.isArray(a)) {
        for (let i = 0; i < ordem; i++) {
            let row = document.createElement('tr');
            table.appendChild(row)

            for (let j = 0; j < ordem; j++) {
                let column = document.createElement('td');
                let input = document.createElement('input')
                row.appendChild(column);
                column.appendChild(input);
                input.setAttribute('readonly', '')
                input.setAttribute('value', a[i][j])
            }
        }
    } else {
        var p = document.createElement('p');
        elemento_pai.appendChild(p);
        p.innerText = "Determinante = " + a;
    }
}