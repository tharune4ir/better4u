export interface BodyPrinciple {
  number: number;
  title: string;
  subtitle: string;
  description: string;
}

export interface SessionStep {
  id: string;
  partNumber: number;
  partTitle: string;
  duration: string;
  description: string;
  focusJoints: string[];
  exercises: {
    name: string;
    details: string;
    regression: string;
  }[];
}

export interface AncientTool {
  name: string;
  nativeName?: string;
  benefits: string[];
  description: string;
}

export const BODY_PRINCIPLES: BodyPrinciple[] = [
  {
    number: 1,
    title: "Less, but better",
    subtitle: "Consistency over heroism",
    description: "More is not the goal—enough, done consistently, forever is. A short session you actually do every day beats a brutal one you quit in three weeks."
  },
  {
    number: 2,
    title: "Adaptation is absolute",
    subtitle: "The body adapts to requests",
    description: "Every session is a request you make. Ask it to be still, and it stiffens. Ask it to move through full ranges under load, and it becomes strong and supple."
  },
  {
    number: 3,
    title: "Bodyweight is a complete gym",
    subtitle: "Zero barriers to entry",
    description: "You do not need chrome machines. Push, pull, squat, hinge, brace, balance, and move—your own weight and a few simple tools will take you remarkably far."
  },
  {
    number: 4,
    title: "Natural human movement",
    subtitle: "Train the full spectrum",
    description: "We are built to squat, hinge, push, pull, carry, walk, run, jump, throw, and rotate. Modern fitness skips rotation entirely. We train to bring it back."
  },
  {
    number: 5,
    title: "Mobility first, strength second",
    subtitle: "Supple joints don't break",
    description: "Strength built on top of stiffness is strength built to break. Earn your range of motion first (spine, hips, shoulders) then build strength through those ranges."
  },
  {
    number: 6,
    title: "Growth lives in recovery",
    subtitle: "Sleep is the master drug",
    description: "You don't grow during the session; you grow during sleep, rest, and nutrition. Train hard enough to ask the question, then recover well enough to let it answer."
  },
  {
    number: 7,
    title: "Patiently be a beginner",
    subtitle: "The tortoise wins the race",
    description: "Soreness is normal; sharp pain is a hard stop sign. Start easier than your ego wants. Progress slowly. The tortoise wins by avoiding injuries."
  }
];

export const MORNING_SESSION_FLOW: SessionStep[] = [
  {
    id: "joints",
    partNumber: 1,
    partTitle: "Wake Up the Joints",
    duration: "~3–4 minutes",
    description: "Send blood, oxygen, and neurological signal to every major joint, telling the system we are in motion and opening up sitting-induced hunches.",
    focusJoints: ["Neck", "Shoulders", "Wrists", "Spine", "Hips", "Knees", "Ankles"],
    exercises: [
      {
        name: "Neck Circles & Nods",
        details: "Slow turns side to side and vertical nods to wake up cervical spine.",
        regression: "Perform seated if standing feels unstable."
      },
      {
        name: "Shoulder & Big Arm Circles",
        details: "Rotate shoulders back and forward, then swing full arms in circular tracks.",
        regression: "Keep hands on shoulders and rotate elbows only."
      },
      {
        name: "Gentle Spinal Twists",
        details: "Stand with soft knees, swinging arms loosely side to side to rotate the thoracic column.",
        regression: "Sit on a chair and turn chest slowly holding the backrest."
      },
      {
        name: "Hip & Knee Circles",
        details: "Circular motions of the pelvis followed by hands-on-knees rotation.",
        regression: "Hold a wall or chair for balance during hip circles."
      }
    ]
  },
  {
    id: "open",
    partNumber: 2,
    partTitle: "Open the Body",
    duration: "~3–4 minutes",
    description: "Lengthen the major muscular chains gently, restoring functional range of motion and releasing lower back and hip stiffness.",
    focusJoints: ["Thoracic Spine", "Latissimus Dorsi", "Hamstrings", "Hip Flexors"],
    exercises: [
      {
        name: "Tall Reach & Side Lean",
        details: "Extend hands high, interlock fingers, and lean laterally to open the side ribcage.",
        regression: "Perform sitting or keep one hand on hip."
      },
      {
        name: "Gentle Forward Fold",
        details: "Fold at the hips, letting arms hang toward toes. Bend knees generously to safeguard the lower back.",
        regression: "Rest hands on shins or a table rather than reaching for the floor."
      },
      {
        name: "Chest Opener / Backbend",
        details: "Clasp hands behind back or press palms into lower back to pull shoulders back and open the chest.",
        regression: "Place hands on wall and lean chest forward."
      },
      {
        name: "Deep Squat Hold",
        details: "Sink low with heels flat, chest tall. Breathe into hips, knees, ankles, and spine.",
        regression: "Hold a door frame or sturdy table leg for support while sitting back."
      }
    ]
  },
  {
    id: "strength",
    partNumber: 3,
    partTitle: "Work Major Muscles",
    duration: "~5–6 minutes",
    description: "Engage the entire body through fundamental human patterns (push, pull, squat, hinge, brace, rotate) with control.",
    focusJoints: ["Pectorals", "Upper Back", "Quads", "Glutes", "Core", "Obliques"],
    exercises: [
      {
        name: "Push-Ups (Push)",
        details: "Strict plank-line pushups, bringing chest down to floor, elbows at 45 degrees.",
        regression: "Elevated push-ups against a kitchen counter, table, or wall."
      },
      {
        name: "Table Rows (Pull)",
        details: "Lie under a sturdy table, grip the edge, and pull chest up, keeping body straight.",
        regression: "Resistance bands anchored to a door, or door-frame grip pulls."
      },
      {
        name: "Bodyweight Squats (Squat)",
        details: "Sit back and down with control, pushing knees out and keeping heels glued down.",
        regression: "Squat down onto a chair or sofa and stand back up (box squat)."
      },
      {
        name: "Glute Bridges (Hinge)",
        details: "Lie on back with knees bent, drive heels into floor to raise hips into full extension.",
        regression: "Keep both feet down. Progress by lifting one leg off the floor."
      },
      {
        name: "The Plank (Brace)",
        details: "Support bodyweight on forearms and toes. Hollow body position, squeeze glutes and abs.",
        regression: "Drop knees to the ground while keeping hips straight."
      },
      {
        name: "Wood-Chops (Rotate)",
        details: "Controlled diagonal twisting motion from low-opposite hip to high-shoulder, mimicking wood cutting.",
        regression: "Perform slowly with zero speed or resistance to focus on core rotation."
      }
    ]
  },
  {
    id: "finisher",
    partNumber: 4,
    partTitle: "Light Finisher",
    duration: "~2 minutes",
    description: "A brief neuromuscular spark to wake up the cardiovascular system and restore light elasticity to the lower legs.",
    focusJoints: ["Heart Rate", "Calves", "Achilles Tendons"],
    exercises: [
      {
        name: "Gentle Skipping",
        details: "Light bouncing in place with or without a physical jump rope, staying on balls of feet.",
        regression: "High-knee marches in place without the jump."
      },
      {
        name: "Rhythmic Hops / Jogging",
        details: "Soft, low-impact hops or light jogging in place to excite spring tissues.",
        regression: "Calf raises followed by walking steps."
      }
    ]
  }
];

export const ANCIENT_TOOLS: AncientTool[] = [
  {
    name: "Mudgar / Gada",
    nativeName: "Indian Mace / Club",
    benefits: [
      "Decompresses shoulder capsule",
      "Builds powerful rotational core grip",
      "Creates traction in the spine",
      "Develops real-world rotational power"
    ],
    description: "By extending the load at the end of a long lever, swinging a Mudgar works your body in beautiful arcs and rotations. It builds bulletproof shoulders and upper back mobility without costing range of motion."
  },
  {
    name: "Pull-Up Bar",
    benefits: [
      "Decompresses spinal disks",
      "Develops lat and scapular pulling strength",
      "Restores shoulder hanging tolerance"
    ],
    description: "The simplest device to remedy the complete lack of pulling motions in daily life. Active and passive hanging alone helps decompress the spine and restore natural shoulder function."
  },
  {
    name: "Resistance Bands",
    benefits: [
      "Variable tension curves",
      "Extremely safe joint loading",
      "Easily adjusts angle of pull"
    ],
    description: "A lightweight tool that adds load without gravity-based compression, perfect for isolating smaller rotator cuff muscles and warming up joints."
  }
];
