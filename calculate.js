var firstNumber = "";
var secondNumber = "";
var operator = "";

function add(num1, num2)
{
    return (parseFloat(num1) + parseFloat(num2)).toString();
}

function subtract(num1, num2)
{
    return (num1 - num2).toString();
}

function multiply(num1, num2)
{
    return (num1 * num2).toString();
}

function divide(num1, num2)
{
    return (num1 / num2).toString();
}

function operate(num1, num2, op)
{
    let result = 0;

    switch ( op )
    {
      case '+': result = add(num1, num2); break;
      case '-': result = subtract(num1, num2); break;
      case '*': result = multiply(num1, num2); break;
      case '/': result = divide(num1, num2); break;
    }
    
    return result;
}

function handleNumeric(num)
{
    if ( operator == "" )
    {
        firstNumber += num;
        $('#result').text(firstNumber);
    }
    else
    {
        secondNumber += num;
        $('#result').text(secondNumber);
    }
}

function handleOperator(op)
{
    if ( firstNumber != "" && secondNumber != "" )
    {
        // perform the operation
        firstNumber = operate(firstNumber, secondNumber, operator);
        $('#result').text(firstNumber);
    }
    else if ( firstNumber == "" )
    {
        firstNumber =  $('#result').text();
    }
    
    operator = op;
    secondNumber = "";
}

function handleEquals()
{
    if ( operator != "")
    {
        if ( firstNumber == "" )
        {
            firstNumber =  $('#result').text();
        }

        if ( secondNumber == "" )
        {
            secondNumber = firstNumber;
        }

        // perform the operation
        firstNumber = operate(firstNumber, secondNumber, operator);
        $('#result').text(firstNumber);
        firstNumber = "";
    }
}

function handleClear()
{
    $('#result').text(0);
    firstNumber = "";
    secondNumber = ""
    operator = "";
}

function handleBackspace()
{
    let result = $('#result').text();
    
    if ( result.length > 1 )
    {
        $('#result').text(result.slice(0,-1));
    }
    else if ( result != "0" )
    {
        $('#result').text(0);
    }
    
    if ( operator == "" )
    {
        firstNumber = $('#result').text();
    }
    else
    {
        secondNumber = $('#result').text();
    }
}

$(document).ready(function()
{    
    $('#result').text(0);

    $('button').on('click', function()
    {
        switch ( this.name )
        {
          case '+':
          case '-':
          case '*':
          case '/':
            handleOperator(this.name);
            break;

          case '=':
            handleEquals();
            break;

          case 'Backspace':
            handleBackspace();
            break;

          case 'C':
            handleClear();
            break;

          default:
            handleNumeric(this.name);
            break;
        }
    });
    
    $(document).keypress(function(event)
    {
        switch ( event.which )
        {
          case 13: handleEquals(); break;
          case 42: handleOperator('*'); break;
          case 43: handleOperator('+'); break;
          case 45: handleOperator('-'); break;
          case 47: handleOperator('/'); break;
          case 49: handleNumeric('1'); break;
          case 50: handleNumeric('2'); break;
          case 51: handleNumeric('3'); break;
          case 52: handleNumeric('4'); break;
          case 53: handleNumeric('5'); break;
          case 54: handleNumeric('6'); break;
          case 55: handleNumeric('7'); break;
          case 56: handleNumeric('8'); break;
          case 57: handleNumeric('9'); break;
          case 46: handleNumeric('.'); break;
          case 99: // c
          case 67: // C
            handleClear();
            break;
          case 100: // d
          case 100: // D
            handleBackspace();
            break;
          default:
            alert('Handler for .keypress() called. - ' + event.which);
            break;
        }
    });
});
