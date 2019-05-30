import RPi.GPIO as GPIO
import sys
import time
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(18,GPIO.OUT)
print "LED on"
sys.stdout.flush()
GPIO.output(18,GPIO.HIGH)
time.sleep(1)
print "LED off"
sys.stdout.flush()
GPIO.output(18,GPIO.LOW)
print "Shutdown"
sys.stdout.flush()