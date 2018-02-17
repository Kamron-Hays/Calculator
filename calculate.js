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

$(document).ready(function()
{
    let firstNumber = "";
    let secondNumber = "";
    let operator = "";
    
    $('#result').text(0);

    $('button').on('click', function()
    {
        switch ( this.name )
        {
          case '+':
          case '-':
          case '*':
          case '/':
            if ( firstNumber != "" && secondNumber != "" )
            {
                // perform the operation
                firstNumber = operate(firstNumber, secondNumber, operator);
                $('#result').text(firstNumber);
                operator = this.name;
            }
            else if ( firstNumber == "" )
            {
                firstNumber =  $('#result').text();
            }
            
            operator = this.name;
            secondNumber = "";
            break;

          case '=':
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
            break;

          case 'Backspace':
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
            break;

          case 'C':
            $('#result').text(0);
            firstNumber = "";
            secondNumber = ""
            operator = "";
            break;

          default:
            if ( operator == "" )
            {
                firstNumber += this.name;
                $('#result').text(firstNumber);
            }
            else
            {
                secondNumber += this.name;
                $('#result').text(secondNumber);
            }
            break;
        }
    });
});
