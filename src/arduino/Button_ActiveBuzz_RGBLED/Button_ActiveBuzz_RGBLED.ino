/************************************************
* function:you can hear the active buzzer beeping.
* But it won't work if you use a passive one here. 
*************************************************/
int buzzerPin = 7;//the pin of the active buzzer attach to pin7
const int keyPin = 12; //the number of the key pin 12

const int redPin = 11; // R petal on RGB LED module connected to digital pin 11 
const int greenPin = 10; // G petal on RGB LED module connected to digital pin 9 
const int bluePin = 9; // B petal on RGB LED module connected to digital pin 10 

void setup()
{
  pinMode(buzzerPin,OUTPUT);//set the buzzer as as OUTPUT
  
  pinMode(keyPin,INPUT);//initialize the key pin as input 

  digitalWrite(buzzerPin,LOW);//initialize the buzzerPin as LOW level

   pinMode(redPin, OUTPUT); // sets the redPin to be an output 
  pinMode(greenPin, OUTPUT); // sets the greenPin to be an output 
  pinMode(bluePin, OUTPUT); // sets the bluePin to be an output 
    digitalWrite(2,HIGH);//initialize the buzzerPin as LOW level
  
  
}
void loop()
{
  
  if(digitalRead(buzzerPin)== HIGH && digitalRead(keyPin) ==LOW){
    digitalWrite(buzzerPin,LOW);//initialize the buzzerPin as LOW level
    
    digitalWrite(2,HIGH);//initialize the buzzerPin as LOW level
  
    // Basic colors: 
  color(255, 0, 0); // turn the RGB LED red 
  
  color(0,255, 0); // turn the RGB LED green 
 
  color(0, 0, 255); // turn the RGB LED blue 
  
  // Example blended colors: 
  color(255,0,0); // turn the RGB LED red 
  
  color(237,109,0); // turn the RGB LED orange 
  
  color(255,215,0); // turn the RGB LED yellow 
  
  color(0,255,0); // turn the RGB LED green 
  
  color(0,0,255); // turn the RGB LED blue 
  
  color(0,46,90); // turn the RGB LED indigo 
 
  color(128,0,128); // turn the RGB LED purple 

    delay(300);
  }
  else if(digitalRead(buzzerPin)==LOW && digitalRead(keyPin) ==LOW){
    digitalWrite(buzzerPin,HIGH);//initialize the buzzerPin as LOW level
    
    digitalWrite(2,LOW);//initialize the buzzerPin as LOW level
  
    delay(300);
  //si lo mantenes apretado, va a prender y apagar 
  }
}

void color (unsigned char red, unsigned char green, unsigned char blue) // the color generating function 
{ 
  analogWrite(redPin, red); 
  analogWrite(bluePin, blue); 
  analogWrite(greenPin, green); 
}
