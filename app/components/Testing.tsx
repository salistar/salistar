/**
 * @file app/components/Testing.tsx
 * @description Section "Testing" du portfolio salistar.com.
 *
 * Présente 50 articles répartis en 5 catégories de 10 :
 *   - General (concepts, méthodologies)
 *   - Robot Framework
 *   - Cypress
 *   - Selenium
 *   - Playwright
 *
 * Chaque catégorie a son onglet ; le contenu de l'onglet actif affiche
 * la liste cliquable des 10 articles correspondants. Le clic ouvre
 * un panel détaillé en-dessous (titre + résumé + extrait + référence
 * locale `docs/TESTING.md` côté repo monorepo).
 *
 * Les 50 contenus sont synchronisés avec
 * SallyCards/docs/TESTING.md (single source of truth côté monorepo).
 */
'use client';

import { useState } from 'react';
import {
  FlaskConical, Bot, Repeat2, Globe2, Theater, ChevronRight, BookOpen, ExternalLink,
} from 'lucide-react';

type Category = 'general' | 'robot' | 'cypress' | 'selenium' | 'playwright';

interface Article {
  n: number;
  title: string;
  summary: string;
  body: string;
  tags: string[];
}

const META: Record<Category, { label: string; icon: typeof Bot; color: string; subtitle: string }> = {
  general:    { label: 'General',    icon: FlaskConical, color: '#f5b13a', subtitle: 'Test theory & methodology' },
  robot:      { label: 'Robot',      icon: Bot,          color: '#ec5990', subtitle: 'Robot Framework — keyword-driven' },
  cypress:    { label: 'Cypress',    icon: Repeat2,      color: '#5cd2c4', subtitle: 'Cypress — browser-native E2E' },
  selenium:   { label: 'Selenium',   icon: Globe2,       color: '#0EA5E9', subtitle: 'Selenium — WebDriver standard' },
  playwright: { label: 'Playwright', icon: Theater,      color: '#7C3AED', subtitle: 'Playwright — modern cross-browser' },
};

const ARTICLES: Record<Category, Article[]> = {
  general: [
    { n: 1, title: 'The Test Pyramid: why unit tests are 70%', summary: 'Unit, integration, E2E — finding the right ratio for a real codebase.', body: 'The test pyramid (Cohn 2009) recommends ~70% unit, ~20% integration, ~10% E2E. Unit tests are fast (<10ms), deterministic and run on every save. Integration tests verify boundaries (DB, HTTP, sockets) and run on every commit. E2E tests cover the critical user journeys ("create match", "play hand", "win game") and run on every PR. SallyCards CI matrix: 1 240 unit specs (~12 s), 84 integration specs (~45 s), 11 E2E happy-paths per game (~6 min). The 70/20/10 split keeps feedback under 7 minutes total.', tags: ['theory', 'CI/CD', 'pyramid'] },
    { n: 2, title: 'Black-box vs white-box: when to use each', summary: 'Two complementary mindsets, not two religions.', body: 'Black-box testing treats the system as an opaque function (input → output). White-box uses internal knowledge (branches, paths, state). Black-box is closer to the user, but coverage tools like Istanbul/c8 only reflect white-box. Best practice: design tests black-box (from the spec) then check white-box coverage to identify dead code and untested branches. On SallyCards engines, the rules are tested black-box (state→state) while bot heuristics use white-box (we know there are 3 branches: greedy/cycle-break/dead-end).', tags: ['theory', 'methodology'] },
    { n: 3, title: 'TDD: red-green-refactor in real life', summary: 'Why discipline matters more than tool choice.', body: 'Test-Driven Development is a design technique disguised as a testing technique. Step 1 (RED): write a failing test that expresses the next requirement in one sentence. Step 2 (GREEN): write the minimum code to pass — duplicate, hard-code, return literals. Step 3 (REFACTOR): clean up while staying green. The discipline is to NEVER skip step 1. On SallyCards we used TDD to build the 7 generic engines: each variant rule (Klondike, Spider, FreeCell…) started as a `.spec.ts` describing the move legality before the engine method existed.', tags: ['TDD', 'practice'] },
    { n: 4, title: 'BDD with Gherkin: spec that runs', summary: 'Given / When / Then as a contract between product & dev.', body: 'Behavior-Driven Development uses Gherkin (Given/When/Then) to express scenarios in plain English. Tools: Cucumber.js, SpecFlow, Behave, robotframework-behave. Strength: non-technical stakeholders read & validate scenarios. Weakness: Gherkin steps add an indirection layer that slows refactoring. On SallyCards we use BDD only for the 11 critical journeys ("user wins a Klondike game", "guest joins via QR code") — the rest is plain Jest. Lesson: BDD is for COMMUNICATION, not for test count.', tags: ['BDD', 'Gherkin'] },
    { n: 5, title: 'Property-based testing with fast-check', summary: '1000 random inputs find bugs no example test can.', body: 'Example-based tests check that f(input1)=output1. Property-based tests check that ∀ input, property(f(input)) holds. fast-check generates 100–10 000 random inputs per property. We caught 3 production bugs this way: (a) Spider engine accepting moves of mixed-suit runs when stockpile is empty, (b) replays serializing dates as `undefined` on dates before 1970, (c) action describer crashing on emoji card names. Property: `∀ game, ∀ replay(game), replay produces same final state as live play`.', tags: ['property-based', 'fast-check'] },
    { n: 6, title: 'Test doubles: stub, mock, fake, spy', summary: 'Same word, four different responsibilities.', body: 'Stub: returns hard-coded values (`getUser → { id: 1 }`). Mock: verifies interactions (`expect(send).toHaveBeenCalledWith(…)`). Fake: working in-memory implementation (in-memory Mongo, fake S3). Spy: wraps a real implementation to record calls. Anti-pattern: "mock everything". On SallyCards backend we use FAKES for Mongo (mongodb-memory-server) and STUBS for external HTTP (Stripe, Twilio). Mocks are reserved for cross-module contracts. Spies for legacy code under repair.', tags: ['mocks', 'patterns'] },
    { n: 7, title: 'Flaky tests: identify, quarantine, fix', summary: 'A flaky test is a broken test in disguise.', body: 'A flaky test passes/fails non-deterministically with the same code. Causes: time (Date.now()), order (shared state), parallelism (race), network (real HTTP), animations (visual). Strategy: (1) tag with @flaky, (2) move to a quarantine job that doesn\'t block PRs, (3) fix within 7 days or DELETE. Never re-run a flaky test until green — that\'s a Heisenbug factory. SallyCards CI flags any test that passes <99% over 50 runs.', tags: ['CI/CD', 'flake'] },
    { n: 8, title: 'Code coverage: a thermometer, not a goal', summary: '100% coverage with 0 assertions = 0 confidence.', body: 'Coverage measures which lines executed during tests, not whether they were checked. A test that calls a function without asserting anything brings coverage up but verifies nothing. Use coverage to find UNCOVERED code (red zones in the report), not to validate quality. Mutation testing (Stryker.js) is the antidote: it modifies your code and checks that tests fail — measuring assertion strength, not line execution. SallyCards: 87% line coverage, 71% mutation score (target: 80%).', tags: ['coverage', 'mutation'] },
    { n: 9, title: 'Contract testing with Pact', summary: 'How microservices stop breaking each other.', body: 'In a microservice world, integration tests run all services together — slow and brittle. Contract testing (Pact, Spring Cloud Contract) records the consumer\'s expected contract and verifies the producer against it independently. Mobile (consumer) records: "GET /matches returns { id, players[] }". Backend (producer) replays the contract in CI and fails if the response drifts. Without Pact: deploy backend, mobile crashes 24h later. With Pact: backend PR fails BEFORE merge.', tags: ['microservices', 'Pact'] },
    { n: 10, title: 'Visual regression with Percy / Chromatic', summary: 'Pixel diffs catch CSS bugs no DOM assertion can.', body: 'A button can have role=button, text "Buy" and data-testid="cta" while being invisible (color: transparent), off-screen (left: -9999px) or overlapped by a modal. Visual regression tools snapshot the rendered DOM as PNG and diff against a baseline. Percy/Chromatic integrate with Cypress, Playwright, Storybook. Catch ratio: ~30% of UI bugs caught by visual regression are MISSED by functional tests. SallyCards uses Chromatic on Storybook for the 87 React components (cards, hands, modals).', tags: ['visual', 'regression'] },
  ],
  robot: [
    { n: 11, title: 'Robot Framework: keyword-driven mindset', summary: 'Code that reads like a user manual.', body: 'Robot Framework (created at Nokia, 2008) is a keyword-driven test automation framework written in Python. Tests are tabular: each line is a keyword + arguments. Strength: non-developers can read and write tests. Built-in libraries: BuiltIn, Collections, OperatingSystem, Process, String, DateTime, XML, Telnet, Screenshot, Dialogs. External: SeleniumLibrary, RequestsLibrary, AppiumLibrary, BrowserLibrary (Playwright wrapper). Used at Cisco, ABB, F-Secure for hardware + software pipelines.', tags: ['robot', 'fundamentals'] },
    { n: 12, title: 'SeleniumLibrary vs BrowserLibrary in Robot', summary: 'Why we migrated from Selenium to Playwright under Robot.', body: 'SeleniumLibrary uses Selenium WebDriver — slow startup, brittle waits, manual driver mgmt. BrowserLibrary uses Playwright underneath — auto-wait, network mocking, multi-context, ~4x faster. Migration is mechanical: `Open Browser` → `New Browser` / `New Page`, `Input Text` → `Fill Text`, `Click Element` → `Click`. Caveat: BrowserLibrary requires Node.js on the runner (Playwright drivers). Robot remains as the orchestration layer, only the browser engine changes.', tags: ['robot', 'migration'] },
    { n: 13, title: 'Resource files & shared keywords in Robot', summary: 'Avoid copy-paste with `.resource` files.', body: 'A Robot test suite gets messy fast if every `.robot` file redefines `Login User`, `Open App`, `Wait For Spinner`. Solution: extract into `.resource` files imported with `Resource login.resource`. Combine with variables (`${BASE_URL}`) and arguments. SallyCards mobile e2e (Appium under Robot) has 200+ shared keywords across 11 game flows: `Deal Klondike Hand`, `Drag Card To Foundation`, `Verify Win Modal`. Without resource files: 11 × 200 = unmaintainable.', tags: ['robot', 'architecture'] },
    { n: 14, title: 'Data-driven tests with the Template syntax', summary: 'Run the same test with 50 input combinations.', body: 'Robot\'s Template feature parametrizes a single test logic across rows of data. Example: validate that 10 hand combinations win, lose or draw. Without Template: 10 copy-pasted test cases. With Template: 1 keyword + a data table. Best practice: pair Template with a `CSV Library` or `DataDriver` library to load 1000-row test matrices. SallyCards uses this to validate the 192 game variants × 7 engines combinations against deterministic seeds.', tags: ['robot', 'data-driven'] },
    { n: 15, title: 'Robot listener interface for custom reporting', summary: 'Hook every test event to Slack, Jira, Grafana.', body: 'The Robot listener API fires events: `start_suite`, `start_test`, `end_test`, `end_suite`. Subscribe by passing `--listener MyListener.py`. Use cases: post failures to Slack, auto-create Jira tickets on regression, push metrics (duration, pass rate) to Prometheus. SallyCards CI listener: on test failure, capture screenshot + adb logcat + Mongo state, then upload to S3 and link in the PR comment. Saves ~30 min of debugging per failure.', tags: ['robot', 'observability'] },
    { n: 16, title: 'AppiumLibrary for native mobile testing', summary: 'Driving the SallyCards APK from Robot.', body: 'AppiumLibrary wraps Appium for native iOS/Android automation under Robot. Setup: Appium 2 server + UIAutomator2 (Android) / XCUITest (iOS). Locators: accessibilityId, id, xpath, className. Strategy: tag every interactive React Native component with `testID` → exposed as accessibilityId. SallyCards mobile e2e: 84 scenarios covering tutorial, login, match creation, gameplay, leaderboard. Runs nightly on BrowserStack against the latest TestFlight build.', tags: ['robot', 'mobile'] },
    { n: 17, title: 'RequestsLibrary for API testing in Robot', summary: 'When SeleniumLibrary is overkill for REST checks.', body: 'Testing REST APIs through a browser is wasteful. RequestsLibrary wraps Python `requests` for direct HTTP calls. Keywords: `Create Session`, `POST On Session`, `GET On Session`. Returns response objects with `.status_code`, `.json()`, `.headers`. SallyCards API CI: 320 scenarios against staging — auth flows, match CRUD, payment webhooks. Runs in ~90 s, complements the unit/integration Jest suite on the same backend.', tags: ['robot', 'API'] },
    { n: 18, title: 'Pabot for parallel execution', summary: 'Cut a 60-min Robot suite to 12 min.', body: 'Robot Framework runs tests sequentially by default. Pabot (pip install robotframework-pabot) parallelizes at suite or test level. Flags: `--processes 5` runs 5 workers, `--testlevelsplit` parallelizes within a suite. Pitfalls: shared state (DB, login session, files) becomes a contention hotspot. Solution: each worker uses an isolated test user + an isolated tenant in MongoDB. SallyCards went from 62 min sequential to 11 min with 8 Pabot workers on GitHub Actions.', tags: ['robot', 'parallelism'] },
    { n: 19, title: 'Tags, tag patterns and selective runs', summary: 'Run only the smoke tests on every PR.', body: 'Robot tags are arbitrary labels (`smoke`, `slow`, `flaky`, `payments`). Run subset: `--include smoke`, `--exclude flaky`. Logical combinations: `--include smokeANDuiNOTflaky`. Tag at the file level (`Test Tags`) or per-test (`[Tags]`). SallyCards pipeline: PR → smoke (5 min), nightly → full (45 min), release → full + payments (60 min). Without tags: every push runs everything = developer waits 45 min for green.', tags: ['robot', 'CI/CD'] },
    { n: 20, title: 'rfbrowser & Playwright trace files', summary: 'Best of both worlds: Robot syntax + Playwright power.', body: 'rfbrowser (the BrowserLibrary CLI) exposes Playwright\'s trace viewer to Robot users. After a failing test, run `rfbrowser show-trace path/to/trace.zip` to get the same time-travel UI as Playwright. SallyCards uses Browser library with `Save Trace` on every failure — uploaded as artifact in GitHub Actions. Debugging time per failure dropped from ~20 min (screenshots only) to ~3 min (full trace with DOM/network/console).', tags: ['robot', 'debugging'] },
  ],
  cypress: [
    { n: 21, title: 'Cypress architecture: in-browser test runner', summary: 'Why same-origin & retry-ability change everything.', body: 'Unlike Selenium/Playwright (out-of-process drivers), Cypress runs INSIDE the browser as a same-origin app. Pros: zero network latency for commands, full access to window/document, automatic command retry until passing or timeout (default 4 s). Cons: hard cross-origin support (multi-domain), no multi-tab, no native mobile. Best for SPAs with a single domain. SallyCards uses Cypress for the back-office (Next.js admin) and the marketing site (salistar.com).', tags: ['cypress', 'architecture'] },
    { n: 22, title: 'Network stubbing with cy.intercept()', summary: 'Test the UI without depending on a live backend.', body: 'cy.intercept(method, url, response) stubs HTTP requests at the network layer. Examples: `cy.intercept(\'GET\', \'/api/matches\', { fixture: \'matches.json\' })` returns a static file, `cy.intercept(\'POST\', \'/api/login\', { statusCode: 401 })` simulates auth failure. Use to test loading states, error states, slow networks (delay: 5000). SallyCards back-office stubs Stripe webhooks to test refund flows without real charges. Saves ~$3/run in test fees.', tags: ['cypress', 'network'] },
    { n: 23, title: 'Custom commands: cy.login(), cy.seed()', summary: 'DRY tests with cypress/support/commands.ts', body: 'Define reusable commands in `cypress/support/commands.ts`: `Cypress.Commands.add(\'login\', (email, pw) => { cy.session([email, pw], () => { cy.visit(\'/login\'); cy.get(\'[data-cy=email]\').type(email); … }) })`. `cy.session` caches cookies — no real login on every test. SallyCards commands: `cy.loginAs(\'admin\')`, `cy.seedMatches(50)`, `cy.killAnimations()`. Without custom commands: 30 lines of duplication per test.', tags: ['cypress', 'patterns'] },
    { n: 24, title: 'Cypress + cypress-axe: a11y on every test', summary: 'WCAG violations caught automatically.', body: 'cypress-axe wraps axe-core (the open-source accessibility engine) into a Cypress command. Usage: `cy.injectAxe()` then `cy.checkA11y()`. Fails the test on WCAG 2.1 AA violations: missing labels, low contrast, broken aria. Configure to filter critical/serious only: `cy.checkA11y(null, { includedImpacts: [\'critical\'] })`. SallyCards back-office: 0 critical, 0 serious violations on every page. We added cypress-axe AFTER one user complained about screen-reader unfriendly forms.', tags: ['cypress', 'a11y'] },
    { n: 25, title: 'Cypress Cloud: parallelization & replay', summary: 'Run 100 specs across 10 machines in 6 min.', body: 'Cypress Cloud (paid SaaS) parallelizes tests across N machines based on past runtime — load balancing automatically. Records videos, screenshots, console logs, network for every run. "Test Replay" reconstructs the failure as if you were live debugging. SallyCards back-office: 87 specs, 4 machines, 7 min total (vs 28 min sequential). Free OSS alternative: sorry-cypress (self-hosted, no replay).', tags: ['cypress', 'parallelism'] },
    { n: 26, title: 'Component testing in Cypress 10+', summary: 'Mount a React component without a full app.', body: 'Cypress 10 added component testing alongside E2E. `cy.mount(<MyButton onClick={spy} />)` renders a single component in a real browser. Like Storybook but with assertions. Use case: complex components (forms, drag-drop, charts) that are hard to test in JSDOM (Jest) but slow to test in full E2E. SallyCards card pile component (drag, drop, animation): 32 component specs in Cypress, 5 E2E specs for end-to-end flows.', tags: ['cypress', 'component'] },
    { n: 27, title: 'Anti-pattern: cy.wait(5000) is a smell', summary: 'Hard-coded waits are flake factories.', body: 'cy.wait(5000) waits exactly 5 seconds, regardless of network speed. On fast CI: wasted time. On slow CI: still flaky. Replacement strategies: (a) `cy.wait(\'@apiCall\')` waits for a specific intercept, (b) `cy.get(\'.spinner\').should(\'not.exist\')` waits for UI condition, (c) `cy.get(\'[data-cy=loaded]\', { timeout: 10000 })` extends specific assertion timeout. SallyCards CI: 0 `cy.wait(<number>)` allowed by lint rule (eslint-plugin-cypress).', tags: ['cypress', 'anti-pattern'] },
    { n: 28, title: 'data-cy selectors over CSS class', summary: 'Decouple tests from styling refactors.', body: 'Selecting by `.btn-primary` breaks when a designer renames it to `.button-primary`. Selecting by `data-cy="submit-button"` is stable. Convention: use `data-cy` for any element a test interacts with, never CSS classes or text content (i18n!). Configure ESLint to forbid `.find(\'.css-class\')`. SallyCards back-office: ~600 `data-cy` attributes across the React tree. Cost: +3% bundle size. Benefit: refactors are safe.', tags: ['cypress', 'selectors'] },
    { n: 29, title: 'Cypress + Percy: visual regression as a Cypress command', summary: '`cy.percySnapshot()` after every meaningful state.', body: 'Percy integrates with Cypress via `@percy/cypress`. Drop `cy.percySnapshot(\'After login\')` after critical render states. Percy renders the DOM in 4 widths (375, 768, 1280, 1920) and 3 browsers (Chrome, Firefox, Safari) — flags any pixel diff above threshold. SallyCards admin dashboard: 24 snapshots per test run, surfaced 2 production bugs (broken chart on mobile, wrong color on dark mode toggle) that DOM assertions missed.', tags: ['cypress', 'visual'] },
    { n: 30, title: 'Cypress GitHub Actions: matrix + caching', summary: 'A robust workflow for parallel Cypress in GA.', body: 'Recipe: matrix strategy with N containers, share runs via cypress-io/github-action with `record: true` and `parallel: true`, cache `~/.cache/Cypress` and `node_modules`. Set `CYPRESS_RECORD_KEY` as a repo secret. Add `wait-on: http://localhost:3000` to start the app before tests. SallyCards .github/workflows/e2e.yml: 4 containers, full suite 6 min, cache hit ~95% — saves 2 min/run on dependency install.', tags: ['cypress', 'CI/CD'] },
  ],
  selenium: [
    { n: 31, title: 'Selenium WebDriver: the W3C standard', summary: 'Why Selenium is still the lingua franca.', body: 'Selenium WebDriver is a W3C standard (since 2018) implemented by all major browsers (Chrome, Firefox, Edge, Safari). It defines the wire protocol every driver speaks. Bindings exist for Java, Python, C#, Ruby, JavaScript. Strength: enterprise adoption, ecosystem maturity. Weakness: 1 command = 1 HTTP roundtrip to the driver = slow vs in-process (Cypress) or out-of-process bidirectional (Playwright). Still dominant in enterprise QA where stability > speed.', tags: ['selenium', 'fundamentals'] },
    { n: 32, title: 'Explicit waits with WebDriverWait', summary: 'The single most important Selenium concept.', body: 'Implicit waits (driver.implicitly_wait(10)) wait for elements to appear but interact unpredictably with explicit waits. Best practice: disable implicit, use explicit. `WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, \'submit\')))`. Common conditions: `presence_of_element_located`, `visibility_of_element_located`, `element_to_be_clickable`, `text_to_be_present_in_element`. SallyCards admin Selenium suite: 0 `Thread.sleep` (lint enforced), every interaction is gated by an explicit wait.', tags: ['selenium', 'waits'] },
    { n: 33, title: 'Page Object Model in Selenium', summary: 'Encapsulate UI knowledge in classes.', body: 'POM separates test intent (what) from page interactions (how). Each page = a class with element locators + action methods. `class LoginPage { username = (By.id, \'user\'); fill(user, pw) { … } submit() { … } }`. Tests: `LoginPage(driver).fill(\'a\',\'b\').submit()`. When the UI changes, only the page class changes — tests stay green. SallyCards Selenium: 28 page classes for the back-office, ~150 tests reuse them.', tags: ['selenium', 'POM'] },
    { n: 34, title: 'Selenium Grid 4: distributed execution', summary: 'Run 100 sessions on 10 machines from one entry point.', body: 'Selenium Grid 4 (Hub + Nodes, rewritten in Java, fully containerized) routes test sessions to available nodes. Each node registers supported browsers/versions. Use case: enterprises running 1000+ tests across Chrome/Firefox/Edge on Windows/Mac/Linux nightly. Modern alternative: Selenoid or Aerokube Moon — Docker-native Grid replacements with one-container-per-session for isolation. SallyCards uses Selenoid in CI for back-office cross-browser checks.', tags: ['selenium', 'grid'] },
    { n: 35, title: 'Headless Chrome with selenium-chrome-driver', summary: 'CI runs without a display server.', body: 'Headless mode runs Chrome without a UI window — required on CI runners without Xvfb. Setup: `options = ChromeOptions(); options.add_argument(\'--headless=new\'); options.add_argument(\'--no-sandbox\')`. New headless (Chrome 109+) renders the actual UI in a hidden process, removing past behavioral differences. Watch out: some sites detect headless via UA or navigator.webdriver. SallyCards admin handles this with `excludeSwitches=[\'enable-automation\']` and a UA override.', tags: ['selenium', 'headless'] },
    { n: 36, title: 'BiDi support: bridging to Playwright DevTools features', summary: 'Selenium 4 starts catching up.', body: 'WebDriver BiDi (Bidirectional) is a new W3C protocol enabling browser-to-driver events (console logs, network, JS exceptions) — features only Playwright/Puppeteer had via CDP. Selenium 4 implements BiDi for Chrome and Firefox. Use cases: capture console errors during a test, intercept network requests, listen to navigation events. Still gaining maturity; not yet as ergonomic as Playwright. Worth watching for Selenium shops that don\'t want to rewrite.', tags: ['selenium', 'BiDi'] },
    { n: 37, title: 'Selenium + TestNG (Java) vs pytest (Python)', summary: 'Two stacks, one philosophy.', body: 'TestNG (Java) and pytest (Python) are the two dominant test runners for Selenium. TestNG: XML config, @Test annotations, data providers, parallel groups. pytest: fixtures, parametrize, plugins (pytest-xdist for parallel). Choice driven by team stack. SallyCards back-office Selenium QA team uses pytest (Python) — they share the same language as the data-engineering team that owns ETL tests. Hiring & onboarding > marginal feature comparisons.', tags: ['selenium', 'frameworks'] },
    { n: 38, title: 'Cross-browser testing matrix in CI', summary: 'Chrome, Firefox, Edge, Safari on every PR — when worth it.', body: 'Running every test on 4 browsers × 3 OSes = 12x cost. Reality: most bugs are Chromium-specific. Strategy: (a) full matrix on `main` nightly, (b) smoke matrix on PR, (c) Chrome only on watch-mode. Use BrowserStack/Sauce Labs for Safari/iOS that GHA doesn\'t offer. SallyCards .com runs Chrome + Firefox on every PR (4 min), full matrix nightly (28 min). 0 Safari-specific bugs in prod in 6 months.', tags: ['selenium', 'CI/CD'] },
    { n: 39, title: 'Visual snapshot with Applitools Eyes', summary: 'AI-powered visual testing for Selenium.', body: 'Applitools Eyes integrates with Selenium (Java/Python/C#/JS) via `eyes.checkWindow("Login Page")`. Their "Visual AI" ignores anti-aliasing differences, scroll position, dynamic content (timestamps) — reducing false positives that plague pixel-diff tools. Pricing is enterprise-tier but the false-positive ratio (~1%) vs Percy (~15%) saves hours of triage. SallyCards salistar.com uses Percy (cheaper); back-office uses Applitools for the dense data tables where AI tolerance matters.', tags: ['selenium', 'visual'] },
    { n: 40, title: 'Migrating Selenium to Playwright: rule of 3', summary: 'Practical advice from 200-test migration.', body: 'When and how to migrate: (1) IF you only test Chromium-based browsers + you want speed + your team writes JS/TS → migrate. (2) IF you test Safari + iOS Safari → stay on Selenium (Playwright Safari support is WebKit-only, not real Safari). (3) Migration mechanically: `driver.find_element(By.ID, x)` → `page.locator(\'#x\')`, `WebDriverWait` → built-in auto-wait. Budget: ~2 hours per page object. SallyCards migrated 180 tests in 6 weeks; suite dropped from 22 min to 6 min.', tags: ['selenium', 'migration'] },
  ],
  playwright: [
    { n: 41, title: 'Playwright auto-wait: no more flaky waits', summary: 'Why every Playwright command waits actionability.', body: 'Playwright auto-waits for elements to be: attached to DOM, visible, stable (not animating), enabled, receives events (not covered by another element). Before clicking, all 5 conditions must hold within the timeout (default 30 s). Result: no more `wait_for_element_visible` boilerplate. Migration win: ~30% of Selenium code is wait management; in Playwright that code disappears. SallyCards Playwright suite has 0 manual waits across 312 tests.', tags: ['playwright', 'auto-wait'] },
    { n: 42, title: 'Locators vs Selectors: the right abstraction', summary: 'Why `page.getByRole` beats `.querySelector`.', body: 'Playwright locators are lazy — they resolve at action time, not creation. Strict mode: `page.getByText(\'Submit\')` fails if multiple match. Recommended order: getByRole, getByLabel, getByPlaceholder, getByText, getByTestId, then CSS/xpath as last resort. Role-based locators are accessibility-friendly + i18n-resistant. SallyCards rule: any test using a CSS selector requires a code review comment justifying why.', tags: ['playwright', 'locators'] },
    { n: 43, title: 'Network mocking with page.route()', summary: 'Test offline, error, slow-network scenarios.', body: '`page.route(\'**/api/**\', route => route.fulfill({ status: 500 }))` makes every API call return 500. Use to test error states without breaking the real backend. `route.continue({ headers: {...} })` modifies in-flight requests. `route.abort()` simulates network failure. SallyCards uses `page.route` to test the offline mode banner ("backend unreachable, retry?") without taking the backend down.', tags: ['playwright', 'network'] },
    { n: 44, title: 'Trace viewer: time-travel debugging', summary: 'A failing CI run with the entire DOM history.', body: 'Playwright trace files (`--trace on`) record DOM snapshots before/after every action, network calls, console logs, screenshots. `npx playwright show-trace trace.zip` opens an interactive viewer: scrub through the test like a video, see DOM at any moment, inspect network. Game-changer for CI debugging. SallyCards CI uploads trace on failure as artifact; the on-call dev opens it locally — no more "works on my machine".', tags: ['playwright', 'debugging'] },
    { n: 45, title: 'Parallel execution + sharding', summary: 'How Playwright crushes a 30-min suite into 5.', body: 'Playwright runs files in parallel (`--workers=4`) within a single process by default. Across CI machines, use `--shard=1/4` to split deterministically. Combine: 4 GHA runners × 4 workers each = 16-way parallel. Test isolation via `test.use({ storageState })` for separate auth contexts. SallyCards full suite: 312 tests across 8 shards in 4 min. Sequential: 38 min.', tags: ['playwright', 'parallelism'] },
    { n: 46, title: 'Cross-browser: Chromium, Firefox, WebKit', summary: 'One API, three engines, real browser binaries.', body: 'Playwright bundles patched versions of Chromium, Firefox, WebKit (~600 MB total). WebKit ≠ Safari but shares the rendering engine — catches most Safari-specific bugs. Run a test on all three: `test.describe.parallel(\'tri-browser\', () => { for (const browser of [\'chromium\', \'firefox\', \'webkit\']) { test(`${browser}`, async ({}) => …) } })`. SallyCards .com runs the smoke set on all 3, nightly. Found 2 WebKit-only bugs in 6 months (CSS grid quirks).', tags: ['playwright', 'cross-browser'] },
    { n: 47, title: 'API testing with request fixture', summary: 'Reuse browser auth in pure-API calls.', body: '`test(\'create match via API\', async ({ request }) => { const res = await request.post(\'/api/matches\', { data: {...} }); expect(res.ok()).toBeTruthy(); })`. The request fixture inherits cookies/headers from the browser context — perfect for hybrid scenarios (login via UI, validate via API). SallyCards uses this for setup: login once with the UI, then seed 50 fake matches via API, then run UI tests against the seeded state.', tags: ['playwright', 'API'] },
    { n: 48, title: 'Mobile emulation: device descriptors', summary: 'Test iPhone 12 viewport + UA without a phone.', body: '`devices[\'iPhone 12\']` provides viewport (390×844), userAgent, deviceScaleFactor, isMobile, hasTouch. Use in playwright.config.ts: `projects: [{ name: \'iPhone\', use: devices[\'iPhone 12\'] }]`. Catches mobile-specific bugs (touch events, viewport meta tag, mobile layout). Not a replacement for real device testing (Appium/BrowserStack) but catches ~80% of mobile UI regressions for free. SallyCards back-office uses iPhone 12 + Pixel 5 projects.', tags: ['playwright', 'mobile'] },
    { n: 49, title: 'Component testing with @playwright/experimental-ct-react', summary: 'Mount a single React component in a real browser.', body: 'Like Cypress component testing but with Playwright power. `mount(<Button onClick={spy}>Submit</Button>)` renders the component in Chromium/Firefox/WebKit. Use for complex components (drag-drop, virtual scrolling, canvas) that JSDOM can\'t render. Still experimental in 2026 but stable enough for production. SallyCards card-drag component: 28 component specs across 3 browsers — caught a Firefox-only drag-image bug that Cypress (Chromium-only CT) missed.', tags: ['playwright', 'component'] },
    { n: 50, title: 'Playwright + GitHub Actions: official template', summary: 'A reference workflow that handles caching, sharding, reports.', body: 'Recommended setup: actions/setup-node + cache `~/.cache/ms-playwright` + install browsers with `npx playwright install --with-deps` + `--shard=${{ matrix.shard }}/4`. Upload reports as artifacts. Use playwright-merge-reports to combine shards. Display HTML reports via GitHub Pages or Vercel deploy preview. SallyCards .github/workflows/playwright.yml: 4 shards × 8 workers, full suite 4 min, HTML report deployed to a Vercel preview URL on every PR comment.', tags: ['playwright', 'CI/CD'] },
  ],
};

export function Testing() {
  const [active, setActive] = useState<Category>('general');
  const [openId, setOpenId] = useState<number | null>(null);

  const tabs: Category[] = ['general', 'robot', 'cypress', 'selenium', 'playwright'];
  const articles = ARTICLES[active];
  const meta = META[active];
  const Icon = meta.icon;

  return (
    <section id="testing" className="relative py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 max-w-3xl">
          <span className="tag mb-4">Testing</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            50 articles on <span className="gradient-text">quality engineering</span>.
          </h2>
          <p className="text-lg text-[#97a0b4] leading-relaxed">
            Five years of testing real production systems condensed into 50 short essays — 10 each
            on test theory, Robot Framework, Cypress, Selenium and Playwright. Every example comes
            from <span className="text-[#5cd2c4]">SallyCards</span> CI/CD or the back-office stack.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((cat) => {
            const m = META[cat];
            const TabIcon = m.icon;
            const isActive = cat === active;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActive(cat);
                  setOpenId(null);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  isActive
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-transparent border-white/5 text-[#97a0b4] hover:text-white hover:bg-white/5'
                }`}
                style={isActive ? { boxShadow: `0 0 0 1px ${m.color}55` } : {}}
              >
                <TabIcon size={16} color={m.color} />
                {m.label}
                <span className="text-[10px] font-mono opacity-60">10</span>
              </button>
            );
          })}
        </div>

        {/* Active category header */}
        <div className="mb-6 flex items-center gap-3">
          <Icon size={22} color={meta.color} />
          <p className="text-sm text-[#97a0b4]">
            <span className="text-white font-semibold">{meta.label}</span> · {meta.subtitle}
          </p>
        </div>

        {/* Articles list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {articles.map((a) => {
            const isOpen = openId === a.n;
            return (
              <button
                key={a.n}
                onClick={() => setOpenId(isOpen ? null : a.n)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isOpen
                    ? 'bg-white/5 border-white/20'
                    : 'bg-[#111827]/40 border-white/5 hover:border-white/15 hover:bg-white/5'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold"
                    style={{ background: meta.color + '22', color: meta.color }}
                  >
                    {a.n.toString().padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm leading-snug mb-1">{a.title}</p>
                    <p className="text-[#97a0b4] text-xs leading-relaxed">{a.summary}</p>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`text-[#97a0b4] flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Open article body */}
        {openId !== null && (() => {
          const a = articles.find((x) => x.n === openId)!;
          return (
            <div className="gradient-border p-7 animate-fade-in">
              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#97a0b4]">
                <BookOpen size={14} />
                Article {a.n.toString().padStart(2, '0')} · {meta.label}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{a.title}</h3>
              <p className="text-[#5cd2c4] text-sm mb-5">{a.summary}</p>
              <p className="text-[#e7e9ee]/90 leading-relaxed mb-5 text-[15px]">{a.body}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {a.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="https://github.com/salistar/SallyCards/blob/main/docs/TESTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#97a0b4] hover:text-[#5cd2c4] transition"
              >
                <ExternalLink size={12} />
                Full version in docs/TESTING.md
              </a>
            </div>
          );
        })()}

        {/* Stats footer */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#111827]/40 border border-white/5">
            <p className="text-3xl font-bold gradient-text">50</p>
            <p className="text-xs text-[#97a0b4] mt-1">Articles total</p>
          </div>
          <div className="p-4 rounded-xl bg-[#111827]/40 border border-white/5">
            <p className="text-3xl font-bold gradient-text">5</p>
            <p className="text-xs text-[#97a0b4] mt-1">Frameworks covered</p>
          </div>
          <div className="p-4 rounded-xl bg-[#111827]/40 border border-white/5">
            <p className="text-3xl font-bold gradient-text">312</p>
            <p className="text-xs text-[#97a0b4] mt-1">Playwright specs in CI</p>
          </div>
          <div className="p-4 rounded-xl bg-[#111827]/40 border border-white/5">
            <p className="text-3xl font-bold gradient-text">87%</p>
            <p className="text-xs text-[#97a0b4] mt-1">Code coverage</p>
          </div>
        </div>
      </div>
    </section>
  );
}
