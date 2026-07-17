# Fieldwork Ethics

BhashaSetu records real people speaking in their own homes. Documenting an
endangered language is only worthwhile if it is done with genuine respect
for the speakers who make it possible. This document sets the ground rules
the team follows for every recording session, in the field or in testing.

## Informed Consent

- No recording begins without a speaker's **explicit, informed consent**,
  given *before* the robot starts listening. Consent is recorded in
  `config/metadata_schema.py`'s `ConsentStatus` (`GRANTED`, `DECLINED`,
  `WITHDRAWN`) and persisted per-session in the database.
- Consent must be explained in the speaker's own language, in plain terms:
  what is being recorded, how long it will be kept, who will hear it, and
  what it will be used for (language preservation / this competition).
- Consent can be **withdrawn at any time**, including after recording. A
  speaker who withdraws consent has their recordings deleted, not just
  flagged.
- A minor should never be recorded without a parent/guardian present and
  consenting.

## Respect During the Session

- The robot's obstacle-avoidance and speaker-detection behavior
  (Decisions 1-2) exist to keep the robot from crowding or startling
  anyone -- it should approach no closer than `SPEAKER_MAX_DISTANCE_M` and
  never block a doorway or walking path.
- Fatigue detection (Decision 5) exists specifically so the robot suggests
  a break rather than pushing a tired speaker to keep going. A human team
  member facilitating the session should always be able to override and
  end a session immediately, for any reason.
- Recordings should capture natural, comfortable speech -- never coach a
  speaker to perform, exaggerate, or say something they are not comfortable
  saying.

## Data Handling

- Recordings and metadata are stored locally (SQLite via `database.py`);
  nothing is uploaded to a third-party service without a speaker's separate,
  explicit consent for that specific use.
- Speaker identity is stored as an opaque `speaker_id`, not a name, in
  recordings unless the speaker has explicitly agreed to be identified.
- Keep raw recordings and any derived transcripts/translations only as long
  as needed for the stated purpose; a speaker's withdrawal of consent
  removes their data from all of these.

## Community Relationship

- The team engages with speakers and communities as partners in
  preservation, not as subjects. Wherever possible, recorded material
  (translations, transcripts) should be made available back to the
  speaker's family or community, not just kept for the competition.
- Compensation, gifts, or reciprocity should never be conditioned on a
  speaker agreeing to be recorded -- that undermines free consent.
- If a community or speaker asks the team not to return, or asks for prior
  recordings to be deleted, that request is honored without argument.
