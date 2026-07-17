# Power System & Safety

## Power Architecture

BhashaSetu uses **two isolated power rails** off a single 3S Li-ion battery
(11.1V nominal) so that motor electrical noise and brownouts can never crash
the Raspberry Pi 5.

```
3S Li-ion Battery (11.1V)
├── Motor rail: battery -> motor driver (H-bridge) -> motors  [direct 11.1V]
└── Logic rail: battery -> XL4015 5A buck converter (-> 5.1V) -> 470uF cap -> Pi 5
```

- **Motors**: driven directly from the 11.1V pack through the H-bridge.
  Motors are electrically noisy and draw large transient currents -- they
  must never share a rail with the Pi.
- **Raspberry Pi 5**: powered from a dedicated **XL4015 5A buck converter**
  set to **5.1V** (Pi 5 wants a firm 5V with headroom for USB peripherals).
- **470uF bulk capacitor** placed directly across the Pi's 5V input absorbs
  transient current draw from the Pi 5 (which can spike, especially with
  the camera and display attached) and keeps the buck converter's output
  stable.

## Safety Rules

1. **Never bridge the two rails.** The motor rail and logic rail share a
   battery negative/ground, but their positive rails are never tied
   together except through the buck converter's own regulation.
2. **Fuse both rails.** Use an inline fuse (sized to the motor driver's
   rated current) on the motor rail, and a smaller fuse or resettable
   polyfuse on the buck converter input.
3. **Check polarity before every connection.** Li-ion packs have no
   reverse-polarity protection built in; a reversed connector can destroy
   the buck converter or the motor driver instantly.
4. **Respect the battery's low-voltage cutoff.** A 3S Li-ion pack should
   not be discharged below ~9.0V (3.0V/cell) under load. Use a battery
   management system (BMS) or a voltage-cutoff alarm; do not rely on
   software alone.
5. **Never charge unattended.** Charge on a fireproof surface (LiPo/Li-ion
   charging bag or ceramic tile), away from flammable material, and stay in
   the room.
6. **Inspect the pack before every use.** Do not use a battery that is
   puffed, punctured, or has damaged wiring/connectors.
7. **Power down before touching wiring.** Disconnect the battery before
   probing, resoldering, or reseating any power connector.
8. **Keep the Pi's power stable during shutdown.** Always issue a proper
   `sudo shutdown -h now` before cutting power to the Pi 5 to avoid SD
   card / filesystem corruption.

## Bench Testing Note

Stage 1 development (this repository's current state) runs entirely on a
laptop with mock hardware -- none of the above applies until the team moves
to physical Pi 5 + motor + battery integration in Stage 2.
