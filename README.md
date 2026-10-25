# AZ Attendance — interactive presentation

Public, synthetic-data demonstration of the AZ Attendance project. Arabic responsive navy/emerald student and superadmin screens. Use the guide to request/approve a device, simulate attendance outcomes, submit/review objections, edit lectures/students, simulate emergency-sheet review and export a CSV.

This static site has no backend, password authentication, real GPS/QR verification or shared database. All state is local to the viewer's browser and can be reset. The admin selector is an unrestricted presentation control, not secure access to the real administration service. Do not enter actual student data or credentials.

The operational Node/SQLite application remains in the separate private repository. This repository contains only standalone demo assets and fictional sample data, with no runtime database, environment secrets or credentials.

## Narrated walkthrough

Eight recordings supplied by Ammar are available with native play/pause and restart controls. Only one track plays at a time. Optional continuous listening advances in recording order. Follow mode selects the relevant role/tab at the start of each part and shows a floating playback control; manual navigation pauses narration. Synchronization is by section, not word-level timed animation.

Audio was processed locally with gentle spectral noise reduction, a 75Hz highpass/10kHz lowpass, and two-pass loudness normalization. No voice cloning, pitch shift, speed change or synthetic speech was used. Durations were checked against the source recordings. Original backups remain outside this public repository. This reduces steady background noise; it does not guarantee separation of another speaker overlapping Ammar. Spoken content has not been independently transcribed or verified word-for-word.
