import ptvsd
import time
import os

print(os.curdir)
print("Waiting to attach")

ptvsd.enable_attach(address=('0.0.0.0', 5678))
ptvsd.wait_for_attach()
time.sleep(2)

print("attached")
print("end")
