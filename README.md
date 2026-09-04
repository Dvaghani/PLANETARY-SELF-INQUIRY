# Planetary Self-Inquiry

> **A science-first public reasoning system investigating the decision:**  
> *“I already have a smartphone. Should I replace it?”*

---

## What This Project Is (and Is Not)

**Planetary Self-Inquiry** is **not**:
- A generic carbon calculator
- A red/green sustainability score
- An anti-consumption moral campaign
- A philosophical advice website

It is an **honest, empirical reasoning system** designed to help a person examine:
1. **Their actual practical situation** (physical safety, functional capability, remaining adequate service horizon).
2. **Their desire to replace the phone** through structured, non-diagnostic self-inquiry grounded in the Acharya Prashant framework.
3. **The physical and environmental consequences** of 5 realistic pathways (*Keep*, *Repair*, *Used / Second-Hand*, *Refurbished*, *Buy New*).
4. **How those consequences participate in shared planetary systems** and affect real people and places the user cares about (**The Planetary Pathway** & **Protect My Four**).
5. **Enabling the user—not the website—to make an autonomous decision.**

---

## Core Principles & Epistemic Separation

### 1. Tripartite Epistemic Separation
Every important claim belongs to one of three strictly separated domains:
- **SCIENCE / EMPIRICAL**: Externally testable claims, peer-reviewed Life Cycle Assessments (LCAs), European Commission JRC ecodesign data, Nature Reviews (2025) metals review, and IPCC AR6 WG1/WG2/WG3 assessments.
- **AP FRAMEWORK / PHILOSOPHICAL**: Inquiry concepts exploring psychological incompleteness, external referencing, and observation without self-deception.
- **PROJECT INTERPRETATION**: Planetary Self-Inquiry's authored visual bridges (*Protect My Four*, *The Planetary Pathway*, answer juxtaposition).

*We never claim scientific evidence validates philosophy, nor that philosophy proves science.*

### 2. No Predetermined Outcome
All 5 physical pathways plus *Investigate Further* and *Still Unclear* are viable. Buying new is never treated as a moral failure, and repair/refurbished are never automatically declared best when the existing phone is genuinely inadequate.

### 3. No Psychological Diagnosis
The interface never tells the user *"you are greedy"*, *"your ego wants this"*, or *"you are rationalising"*. It only faithfully juxtaposes things the user explicitly said and asks what they make of the combination.

### 4. Epistemic Rigor: Unknown $\neq$ 0
If evidence does not support a figure, the system displays:  
*“Not enough evidence to quantify this responsibly.”*  
We refuse to fabricate defaults simply to populate an interface.

### 5. No Single Eco Score
Climate ($\text{kg CO}_2\text{e}$), raw material extraction, water, and e-waste circularity remain separate domains and are never collapsed into a single red/green badge.

### 6. Inspectable Provenance
Every quantitative and qualitative claim links directly to an inspectable dossier revealing claim, source, scope, boundary, assumptions, uncertainty, and limitations.

---

## The 4-Stage Experience

1. **Stage 1: Situation (“A working phone. A real decision”)**
   - Device search/picker (Fairphone 5, Samsung Galaxy S25 EUR, Apple iPhone 16 128GB, or generic fallback).
   - Practical capability & safety checks (`safe_to_use = false` marks keep infeasible).
   - User-estimated remaining service horizon (preserving ranges like 1–2 years; never derived from phone age or seller grade).
   - Optional charging grid carbon intensity lookup.
   - Old phone downstream fate tracking.

2. **Stage 2: AP-Grounded Self-Inquiry**
   - 6 sequential questions (`APQ1_FUNCTION` through `APQ6_RESEE`).
   - Verbatim answer preservation.
   - Non-diagnostic reflection engine: *Restatement* $\rightarrow$ *Juxtaposition* $\rightarrow$ *Question* $\rightarrow$ *AP Lens* $\rightarrow$ *Open Choice*.

3. **Stage 3: Empirical Evidence & Planetary Bridges**
   - **5 Realistic Pathways**: `KEEP`, `REPAIR`, `USED`, `REFURBISHED`, `NEW`.
   - Prospective decision boundaries (past manufacturing excluded from prospective keep).
   - **Visual Bridge 1: From This Phone to a Shared Planet**: Interactive causal chain from handset choice to raw ores, semiconductor fabrication, global atmospheric mixing (~0.45°C/1,000 GtCO2), and shared regional risks.
   - **Visual Bridge 2: Protect My Four**: Connecting loved ones' locations to documented IPCC WGII regional climate risks, with a strict boundary between supported physical contribution and refusal of individual causal guilt.

4. **Stage 4: Autonomous Choice**
   - 7 unranked options: Keep, Repair, Used, Refurbished, Buy New, Investigate Further, Still Unclear.
   - Captures user rationale in their own words.
   - Printable/exportable Inquiry Dossier.
   - Concludes: *“Your conclusion remains yours.”*

---

## 30 Verified Scientific Invariants

The deterministic calculation engine enforces all 30 scientific invariants from the project specification, covered by 33 automated Vitest tests:
- $\text{Unknown} \neq 0$ and $\text{Unknown} \neq \text{False}$.
- Prospective keep production is $0\text{ kg CO}_2\text{e}$.
- Generic new production bracket: $25–70\text{ kg CO}_2\text{e}$, distribution $2–4\text{ kg CO}_2\text{e}$.
- Generic battery repair: $0.3–0.7\text{ kg CO}_2\text{e}$; generic display: $3–8\text{ kg CO}_2\text{e}$.
- Generic mainboard repair has no approved factor $\rightarrow$ remains unquantified/unknown.
- ADEME $7.61\text{ kg CO}_2\text{e}$ restricted strictly to ADEME 2-year reference scenario.
- Arbitrary refurbished phone with no certified data returns unknown (refusal of fabricated numbers).
- Used phone cut-off accounting: no automatic 1:1 avoided new phone credit.
- No amortization of candidate lifetime to artificially favor premature replacement in horizon $H$.
- All qualitative domains (materials, water, circularity) remain uncollapsed.

---

## Tech Stack & Project Ethics

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS with custom tokens (luminous warm-white aesthetic, responsive for mobile 390px and desktop, respects `prefers-reduced-motion`)
- **Icons**: Lucide React
- **Testing**: Vitest (100% test pass rate)
- **Privacy & Hosting**: 100% client-side calculation, zero user tracking or data transmission, targeted at €0/month hosting.

---

## Getting Started (How to Run on Your PC)

### Prerequisites
- **Node.js**: v18, v20, v22, or newer ([Download Node.js](https://nodejs.org/))
- **npm** (comes bundled with Node.js)
- **Git**: ([Download Git](https://git-scm.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/Dvaghani/PLANETARY-SELF-INQUIRY.git
cd PLANETARY-SELF-INQUIRY
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
After running this, open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 4. Run Automated Invariant Tests (Optional)
Runs all 33 Vitest tests verifying the scientific invariants:
```bash
npm test
```

### 5. Build for Production (Optional)
```bash
npm run build
npm run preview
```

---

## License
MIT
