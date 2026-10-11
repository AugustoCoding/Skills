---
name: lesson-generator
description: Generates an interactive HTML lesson that teaches how to program, in Python, the solution of a chemical engineering exercise. Use it ONLY when the user asks for this skill by name (lesson-generator), for example "use lesson-generator on this exercise". Do not use it on your own for chemical engineering exercises or questions without that request.
disable-model-invocation: true
argument-hint: "Paste the exercise you want to learn to solve by programming"
---

# lesson-generator

## 1. Goal

From a chemical engineering exercise, you produce a **lesson**: an HTML file that teaches the student to program the solution in Python. The student knows the engineering, but cannot program and has no experience with simulation.

**Quality criterion.** The lesson must teach the most in the least time, both the student's reading time and the generation time. A correct lesson that takes half an hour to generate has failed as much as a shallow one. When this skill does not cover a situation, choose the option that best meets this criterion.

**Division of responsibilities.** The engineering and the programming are yours: you solve the exercise and choose the technique. The form belongs to the skill and is ready. **Your job is to copy and fill in**: replace each `{…}` of the template (`templates/lesson.html`) and copy from `templates/pieces.html` the piece closest to the exercise, adjusting symbols, labels and calculations. You must not write CSS, JavaScript beyond the figure's `compute` function, or new markup, and you must not read the files in `assets/`. Build a piece from scratch only if none fits, in the same pattern as the existing ones.

**Language.** The lesson is written in the language of the problem statement: all its text, the section titles, the labels of the figure and the comments and printed messages of the program. Set `<html lang>` to that language (`en`, `pt-BR`, `es`…); the fixed interface texts (buttons, table of contents, labels) follow it by themselves, in Portuguese or in English. Your reply to the student is in the same language.

## 2. Glossary

| Term | Meaning |
|---|---|
| model | the mathematical model of the exercise (balances and equations); whoever runs the skill is always "you" |
| lesson | the final HTML file, delivered to the student |
| draft | the working copy, in `.draft-<name>/`, deleted on delivery |
| section | one of the four parts of the lesson: opening, the model, the code, the result |
| derivation step | an item of the derivation of a balance (`ol.derivation > li`) |
| code step | an item of the code section (`div.step`) |
| piece | a ready-made excerpt of `templates/pieces.html`: a balance or a figure |
| figure | a plot of `plot.js`, with up to four sliders |

The verbs **must** and **must not** state mandatory rules; **may** states an option; **should** states the preferred choice, which may be departed from with a reason.

## 3. Workflow

If the request does not bring a concrete exercise (for example, "teach me tubular reactors"), reply in one line that the skill needs a problem statement and answer the request normally, without generating a lesson.

You must not interview the student (infer from the statement what you would need to ask) nor create state files or notes about them.

Run the scripts from your working folder, with full paths, without entering the draft folder: on Windows, a terminal inside it prevents its deletion.

1. **Diagnosis.** Read the statement and identify what it asks, the data it gives, the missing data and the kind of mathematical problem.
2. **Numbers.** Compute the results with quick calculations, as in section 5.
3. **Draft.** Run `python <this skill's folder>/scripts/new_lesson.py "<exercise name>" [folder]`. Pass the folder only if the student named one; with no folder named, pass none, not even `.`: the script writes to `./lessons`. It reports where the draft is and where the lesson will go.
4. **Filling in.** The template has each element once, as a pattern: repeat it as many times as the exercise needs (balances, derivation steps, code steps, observations), replace each `{…}`, including those inside attributes, and delete what is not used. The concrete content comes from `templates/pieces.html`: a complete example derivation, the balance equations, the complementary equations and the figures.
5. **Check.** Run `python <this skill's folder>/scripts/check.py <draft.html>`. Every ERROR must be fixed; every WARNING must be assessed. The script runs the pasted code steps in order, compares the answer with what the program prints, flags any forgotten `{…}` and lists the numbers of the text for the source review (section 5).
6. **Visual check, if there is a browser.** Serve the draft folder (`python -m http.server 8730 --bind 127.0.0.1`), open the lesson through `http://`, confirm that the figures draw and read the console, where `plot.js` warns about flattened curves, controls without range and non-finite values. Without a browser, step 5 is enough.
7. **Delivery.** Run `python <this skill's folder>/scripts/pack.py <draft.html>`, which builds the single file, writes the lesson to its destination and deletes the draft. After that, the lesson does not change.
8. **Reply to the student.** Two lines at most: where the lesson is and the invitation to ask in the chat. Do not repeat the answer, the derivation or your choices: they are in the lesson. The session ends at delivery: you must not commit or take any action the student did not ask for.

## 4. Structure of the lesson

The lesson has four sections, in this order: opening, the model, the code and the result. There is no extra exercise at the end.

**Length.** There is no word limit. Cut what does not teach (repetition, historical context, caveats without consequence); never shorten what teaches (the definition of a symbol, the context of an equation, the reason for a decision).

**Color.** Each quantity shown in a figure must carry the color of its series everywhere: equation, symbol list, table and text, including in its name ("reactant A"). Parameters and everything else stay uncolored. Every symbol quoted in the text must be marked (`span.var-N` or, uncolored, `span.param`), so it comes out in italics and at the size of the equation. The markup is in the template.

### 4.1 Opening

The lesson starts with the **problem statement** (`div.problem`), rewritten clearly: all the data of the exercise, with units and marked symbols, and, in a list, what it asks, one item per question. Then, two or three sentences: what happens in the process and what the student will have at the end.

### 4.2 The model

**Every balance must be derived**, from the conservation principle to the form used in the code, one derivation step per item. Reason: seeing where the equation comes from teaches the student to set up the balance of the next exercise.

- The title of the balance must state its nature (mass or energy), whether it is overall or of which component, and the unit. Example: "Mass balance of component A, in moles".
- The first step is the principle, in words, with the control volume; the second, the translation of each word into symbols, with a brace under each term.
- Each following step must perform a single operation and declare its kind: principle, translation, kinetics, assumption, algebra or definition.
- Every assumption must say what would happen if it did not hold, because the assumption is what changes from one exercise to another.
- The last step is the model equation, with the braces, followed by a paragraph that describes what it represents in the process and, then, what it implies.
- A balance that would repeat the steps of one already derived shows the principle and the translation and sums up the rest in one step.
- The order of the balances is the one the derivation requires: for example, the overall one comes before the component one when the latter depends on it.

An equation that is not a balance (a given rate law, a correlation) is not derived: it goes in a block of its own (`div.eq-block`), with its name in `data-title`.

- Each symbol must be defined where it first appears, in a full sentence, with its unit: "concentration of reactant A inside the reactor, mol/L", not "concentration, mol/L".
- Each term with a physical meaning of its own should have a brace of two to five words; not in pure algebra steps.
- Displayed equations must be in MathML; code never.

After the derivation, the model section has only two more elements:

1. **The parameter table**, with the value, unit and source of each one.
2. **The technique box**, which closes the section in four or five sentences, in this sequence:
   - the kind of mathematical problem, in plain words;
   - "to solve this kind of problem, we will use" the technique, with its name also highlighted in the text (`span.term`). The name of the technique, in the title of the box, is short: up to four words ("Root finding", "Numerical integration"); the details go in the text;
   - why it fits this case;
   - "in Python, the function that does this is" such, "from the library" such;
   - "See the next section to learn how to use it."

   If the answer comes from a direct calculation, with no numerical method, the technique is that calculation, and the Python feature is what performs it (NumPy operations, for example). When a closed form exists, it must be the technique; a numerical method then serves as the check.

Every simulation or numerical method term (integrator, integration step, tolerance, convergence) must be explained in plain words the first time it appears.

### 4.3 The code

The program is explained in at most six steps, followed by a last step with the complete program.

- The title of each step is what the student sees before opening it: it must announce the content without revealing the answer.
- Each step must have three parts, in this order:
  1. **purpose** (`p.purpose`), before the code: the intention of the step;
  2. **how** (`p.how`), after the code: the syntax of each new element, such as what a `def` is, what the function receives and returns, what each print format means;
  3. **so far** (`p.so-far`), last: what the program now does.
- Every library function must have all its arguments explained, positional and keyword: what each one is and why it has that value. When there are many, the "how" should be written as a list (`ul.how`), one item per argument, instead of a long paragraph; a step that is still heavy may be split in two.
- When one of your functions is handed to a library function (the balance function to `solve_ivp`, the residual one to `brentq`), explain the mechanism: who calls it, how many times, with what values in each argument, and what is done with what it returns. That is what gives meaning to the order of the arguments, to `y[0]` (the state always arrives as a list, even with a single variable) and to `args=(…,)` (the path by which an extra value reaches each call, and why the comma).
- Every construct a beginner would not recognize (list index, tuple, unpacking, function as argument, an attribute such as `.terminal`) must be explained with what it is and what it does in this program.
- The check is mandatory: an independent calculation that confirms the result (analytical case, a balance that closes, a limiting case).
- The precision criterion of a numerical result must be explained in the step where the method is used.
- The code steps, pasted in order, must form exactly the complete program and run without errors.
- The program must end with a matplotlib figure (`plt.show()`): the same as in the result section, or a simple version of it. It is what the student sees when running the code in the editor.

### 4.4 The result

The section starts with the **answer**, which must answer with a number every question of the statement, one by one, with the same values and decimals the program prints. If a question has no printed number, the program must start printing it; the answer never refers to another part of the lesson. Then comes the figure the question requires (in time, along the reactor, against a parameter, data against model), registered in `plot.js` with the same calculation as the program. The lesson may have at most two figures.

- At most four controls. Each one must be motivated by an observation of its own, and the range and step of the control must reach the value that observation asks for.
- Two to four observations reading the curve, plus one per control. Each observation must quote a value or a stretch of curve of this exercise; a sentence that would serve another exercise must be cut.
- The title of each observation is a question or, in the control observations, the action to take; never the conclusion.
- Each control observation must give the same change in the code and what the program then prints.
- Each quantity must have a single name in the whole lesson, the same as in the legend. A curve is called by that name, never by its color ("the blue curve"): the colors depend on the theme, and the name is what the student finds in the legend.
- You must not list what the model disregards.

### 4.5 Optional elements

Each optional element must only be used if it teaches something the main text does not:

- with markup in the template: a results table, a side note and a highlighted term;
- as figures from `pieces.html`: a second axis and data against model.

You must not create a component or a figure that is not of the x versus y kind: whatever does not fit that format must be explained in text.

## 5. Numbers and sources

**Prior calculation.** Before writing, compute the results with quick calculations, only to know what the lesson will state. If an analytical solution exists, even for a particular case or a limit, use it to confirm the numerical result. If the two disagree, find the error before going on, without presuming which one is right. The program must run in under 30 s; if it takes longer, revise the method.

**Every number quoted in the lesson must be printed by the delivered program**, including the instants, peaks and crossings mentioned in the observations. The data of the statement also count, and a simple calculation shown in the text with numbers already quoted ("2.00 − 1.35 = 0.65 mol/L"). If a number would need an extra step to be calculated, do not quote it.

**Source.** Review each number of the list printed by `check.py`, including ranges and percentages in the middle of sentences. Every number must be of one of these kinds:

- **given** in the statement;
- **derived**, with the calculation shown;
- **physical constant** (the gas constant, for example), with no reference;
- **your choice**, marked in the table with the reason in half a line (initial conditions, time horizons, tolerances).

The range of a control needs no source, but must make physical sense. You must not cite literature.

**Format.** In the lesson text, numbers follow the convention of the lesson's language: a decimal comma in Portuguese ("350,4 L"), a point in English ("350.4 L"), even when they reproduce the program's output. Inside the code, the point is always the decimal separator.

## 6. Technical constraints

- The lesson must open without internet. The exception is the editor, which downloads Python on first run.
- Use only libraries available in Pyodide (numpy, scipy, matplotlib, pandas, sympy). If another is indispensable, the step that imports it must warn that this piece only runs on a computer.
- All code must run; every parameter and every axis must have a unit.
- A code block that is not Python must take the class `no-highlight`.
- Code lines should be at most 70 characters: on a narrow sheet, the font of the block shrinks to fit, and a short line shrinks less.
- The lesson must not have external links nor promise a continuation.

## 7. After delivery

The lesson is not edited after delivery. The student's questions are answered in the chat. If the student explicitly asks for a lesson with something more, it is a new lesson, with another name.
