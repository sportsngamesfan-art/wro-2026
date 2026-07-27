import sounddevice as sd

print("Available microphones:")
for i, dev in enumerate(sd.query_devices()):
    if dev['max_input_channels'] > 0:
        print(f"  [{i}] {dev['name']}")