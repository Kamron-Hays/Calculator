var firstNumber = "";
var secondNumber = "";
var implicitNumber = "";
var operator = "";
var implicitOperator = "";
var lastChar = "";
var error = false;

function formatNumber(num)
{
    // round to 3 decimal places and remove trailing zeros
    let result = parseFloat(num.toFixed(9));
    
    if ( result > 999999999 || result < -999999999 )
    {
        result = result.toExponential(3);
    }

    return result.toString();
}

function add(num1, num2)
{
    return formatNumber(parseFloat(num1) + parseFloat(num2));
}

function subtract(num1, num2)
{
    return formatNumber(num1 - num2);
}

function multiply(num1, num2)
{
    return formatNumber(num1 * num2);
}

function divide(num1, num2)
{
    let result = "";

    if ( num2 == "0" )
    {
        error = true;
        result = "Error";
    }
    else
    {
        result = formatNumber(num1 / num2);
    }
    
    return result;
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

function isOperator(ch)
{
    let isOp = false;

    if ( ch == '+' || ch == '-' || ch == '*' || ch == '/' )
    {
        isOp = true;
    }
    
    return isOp;
}

function handleNumeric(num)
{
    // Don't allow more than one decimal in a number
    if ( num == '.' && $('#result').text().includes('.') ) { return; }

    // Don't allow leading zeros
    if ( num == '0' && $('#result').text() == '0' ) { return; }
    
    if ( operator == "" )
    {
        if ( firstNumber == "" && num == '.' ) { firstNumber = "0"; }
        else if ( firstNumber == "0" ) { firstNumber = ""; }
        firstNumber += num;
        $('#result').text(firstNumber);
    }
    else
    {
        if ( secondNumber == "" && num == '.' ) { secondNumber = "0"; }
        else if ( secondNumber == "0" ) { secondNumber = ""; }
        secondNumber += num;
        $('#result').text(secondNumber);
        implicitNumber = secondNumber;
    }
}

function handleOperator(op)
{
    let result = $('#result').text();
    let history = $('#history').text();

    // If an operator has already been specified
    if ( isOperator(lastChar) )
    {
        // replace previous operator in history
        history = history.slice(0,-1);
        $('#history').text(history + op);
    }
    else
    {
        $('#history').text(history + " " + result + " " + op);
    }

    if ( firstNumber != "" && secondNumber != "" )
    {
        // perform the operation
        firstNumber = operate(firstNumber, secondNumber, operator);
        $('#result').text(firstNumber);
    }
    else if ( firstNumber == "" )
    {
        firstNumber = $('#result').text();
    }
    
    operator = op;
    secondNumber = "";
    implicitNumber = "";
}

function handleEquals()
{
    if ( operator == "" && implicitOperator != "" )
    {
        operator = implicitOperator;
    }

    if ( operator != "" )
    {
        if ( firstNumber == "" )
        {
            firstNumber =  $('#result').text();
        }

        if ( secondNumber == "" )
        {
            if ( implicitNumber == "" )
            {
                implicitNumber = firstNumber;
            }

            secondNumber = implicitNumber;
        }

        // perform the operation
        firstNumber = operate(firstNumber, secondNumber, operator);
        $('#result').text(firstNumber);
        firstNumber = "";
        secondNumber = "";
        implicitOperator = operator;
        operator = "";
    }
    
    $('#history').text("");
}

function handleClear()
{
    $('#result').text(0);
    $('#history').text("");
    firstNumber = "";
    secondNumber = "";
    implicitNumber = "";
    operator = "";
    implicitOperator = "";
    lastChar = "";
    error = false;
}

function handleClearEntry()
{
    $('#result').text(0);

    if ( operator == "" )
    {
        firstNumber = $('#result').text();
    }
    else
    {
        secondNumber = $('#result').text();
    }
}

function handleBackspace()
{
    let result = $('#result').text();
    
    // Only allow backspace when entering a number
    if ( firstNumber == "" ||
         ( operator != "" && secondNumber == "" ) ) { return; } // do nothing

    if ( result.length > 1 )
    {
        $('#result').text(result.slice(0,-1));
        
        // Handle trailing negative sign
        if ( $('#result').text() == '-' )
        {
            $('#result').text(0);
        }
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
        implicitNumber = secondNumber;
    }
}

function handleInput(ch)
{
    if ( error ) { handleClear(); }

    switch ( ch )
    {
      case '+':
      case '-':
      case '*':
      case '/':
        handleOperator(ch);
        break;

      case '=':
      case 'Enter':
        handleEquals();
        break;

      case 'Backspace':
        handleBackspace();
        break;

      case 'Delete':
        handleClearEntry();
        break;

      case 'Escape':
        handleClear();
        break;

      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ".":
        handleNumeric(ch);
        break;
    }

    lastChar = ch;
}

$(document).ready(function()
{
    $('body').css("maxWidth", $('body').width());
    $('#result').text(0);

    $('button').on('click', function()
    {
        handleInput(this.name);
    });
    
    $(document).keydown(function(event)
    {
        handleInput(event.key);
    });
});