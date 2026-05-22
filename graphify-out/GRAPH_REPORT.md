# Graph Report - /Users/ron/Documents/msiprojects/msitest  (2026-05-22)

## Corpus Check
- Corpus is ~44,254 words - fits in a single context window. You may not need a graph.

## Summary
- 506 nodes · 607 edges · 77 communities detected
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 52 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Architecture & Backend|Architecture & Backend]]
- [[_COMMUNITY_UI Card Components|UI Card Components]]
- [[_COMMUNITY_Convex Backend Functions|Convex Backend Functions]]
- [[_COMMUNITY_Worker Client API|Worker Client API]]
- [[_COMMUNITY_Sidebar Navigation|Sidebar Navigation]]
- [[_COMMUNITY_Command Palette|Command Palette]]
- [[_COMMUNITY_Pagination UI|Pagination UI]]
- [[_COMMUNITY_Breadcrumb Navigation|Breadcrumb Navigation]]
- [[_COMMUNITY_Menu Component|Menu Component]]
- [[_COMMUNITY_Select Dropdown|Select Dropdown]]
- [[_COMMUNITY_Toolbar Component|Toolbar Component]]
- [[_COMMUNITY_Media Query Hooks|Media Query Hooks]]
- [[_COMMUNITY_Alert Dialog|Alert Dialog]]
- [[_COMMUNITY_Form Field Component|Form Field Component]]
- [[_COMMUNITY_Number Field|Number Field]]
- [[_COMMUNITY_Table Component|Table Component]]
- [[_COMMUNITY_Frame Component|Frame Component]]
- [[_COMMUNITY_Product & PRD Strategy|Product & PRD Strategy]]
- [[_COMMUNITY_Alert Component|Alert Component]]
- [[_COMMUNITY_Design System Tokens|Design System Tokens]]
- [[_COMMUNITY_Auth Pages|Auth Pages]]
- [[_COMMUNITY_Group Component|Group Component]]
- [[_COMMUNITY_Input Group|Input Group]]
- [[_COMMUNITY_Popover Component|Popover Component]]
- [[_COMMUNITY_Empty State|Empty State]]
- [[_COMMUNITY_Dashboard Layout|Dashboard Layout]]
- [[_COMMUNITY_Project Tests|Project Tests]]
- [[_COMMUNITY_Tabs Component|Tabs Component]]
- [[_COMMUNITY_Scroll Area|Scroll Area]]
- [[_COMMUNITY_Combobox Component|Combobox Component]]
- [[_COMMUNITY_Radio Group|Radio Group]]
- [[_COMMUNITY_Toast Notifications|Toast Notifications]]
- [[_COMMUNITY_Fieldset Component|Fieldset Component]]
- [[_COMMUNITY_Preview Card|Preview Card]]
- [[_COMMUNITY_Avatar Component|Avatar Component]]
- [[_COMMUNITY_Proxy Module|Proxy Module]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Convex Client Provider|Convex Client Provider]]
- [[_COMMUNITY_Settings Page|Settings Page]]
- [[_COMMUNITY_Project Detail Page|Project Detail Page]]
- [[_COMMUNITY_Form Field Wrapper|Form Field Wrapper]]
- [[_COMMUNITY_Feature Map View|Feature Map View]]
- [[_COMMUNITY_Auth Form Component|Auth Form Component]]
- [[_COMMUNITY_Create Project Dialog|Create Project Dialog]]
- [[_COMMUNITY_PRD Upload Component|PRD Upload Component]]
- [[_COMMUNITY_Progress Bar|Progress Bar]]
- [[_COMMUNITY_Sheet Panel|Sheet Panel]]
- [[_COMMUNITY_Meter Component|Meter Component]]
- [[_COMMUNITY_Accordion|Accordion]]
- [[_COMMUNITY_Tooltip|Tooltip]]
- [[_COMMUNITY_Switch Toggle|Switch Toggle]]
- [[_COMMUNITY_Keyboard Shortcut|Keyboard Shortcut]]
- [[_COMMUNITY_Checkbox Group|Checkbox Group]]
- [[_COMMUNITY_Dialog Component|Dialog Component]]
- [[_COMMUNITY_OTP Field|OTP Field]]
- [[_COMMUNITY_Separator|Separator]]
- [[_COMMUNITY_Button Component|Button Component]]
- [[_COMMUNITY_Toggle Component|Toggle Component]]
- [[_COMMUNITY_Spinner Loading|Spinner Loading]]
- [[_COMMUNITY_Collapsible|Collapsible]]
- [[_COMMUNITY_Textarea|Textarea]]
- [[_COMMUNITY_Autocomplete|Autocomplete]]
- [[_COMMUNITY_Skeleton Loader|Skeleton Loader]]
- [[_COMMUNITY_Form Component|Form Component]]
- [[_COMMUNITY_Brand & Visual Identity|Brand & Visual Identity]]
- [[_COMMUNITY_Scope & Rationale|Scope & Rationale]]
- [[_COMMUNITY_Worker State Machine|Worker State Machine]]
- [[_COMMUNITY_Misc 107|Misc 107]]
- [[_COMMUNITY_Misc 108|Misc 108]]
- [[_COMMUNITY_Misc 109|Misc 109]]
- [[_COMMUNITY_Misc 110|Misc 110]]
- [[_COMMUNITY_Misc 111|Misc 111]]
- [[_COMMUNITY_Misc 112|Misc 112]]
- [[_COMMUNITY_Misc 113|Misc 113]]
- [[_COMMUNITY_Misc 114|Misc 114]]
- [[_COMMUNITY_Misc 115|Misc 115]]
- [[_COMMUNITY_Misc 116|Misc 116]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 34 edges
2. `ConvexClient` - 13 edges
3. `LLM Abstraction Module` - 8 edges
4. `useSidebar()` - 6 edges
5. `Convex Database Schema (11 Tables)` - 6 edges
6. `End-to-End Execution Flow` - 6 edges
7. `Issue #7: Worker/Agent & Playwright Runner` - 6 edges
8. `getKey()` - 5 edges
9. `parseQuery()` - 5 edges
10. `useMediaQuery()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Globe Icon SVG (Web/URL indicator)` --conceptually_related_to--> `Explore Engine`  [INFERRED]
  public/globe.svg → PRD.md
- `Coding Guidelines (Think, Simplicity, Surgical, Verify)` --semantically_similar_to--> `Design Principles`  [INFERRED] [semantically similar]
  AGENTS.md → PRODUCT.md
- `Window Icon SVG (Browser/App window)` --conceptually_related_to--> `Next.js Dashboard Component`  [INFERRED]
  public/window.svg → ARCHITECTURE.md
- `Semantic Status Colors (Pass/Fail/Warning)` --semantically_similar_to--> `Test Run State Machine`  [INFERRED] [semantically similar]
  DESIGN.md → ARCHITECTURE.md
- `Convex Development Guidelines` --conceptually_related_to--> `Convex Database Schema (11 Tables)`  [INFERRED]
  convex/_generated/ai/guidelines.md → PRD.md

## Hyperedges (group relationships)
- **AI Pipeline: PRD to Test Execution** — prd_md_prd_processor, prd_md_explore_engine, prd_md_plan_generator, prd_md_code_generator, prd_md_playwright_runner, prd_md_failure_analyzer [EXTRACTED 0.95]
- **Sequential Issue Dependency Chain** — issue01_foundation, issue02_project_mgmt, issue03_prd_upload, issue04_exploration, issue05_test_plan, issue06_code_gen, issue07_worker_agent, issue08_test_execution [EXTRACTED 1.00]
- **Design Token System: Tokens to Tailwind to UI** — design_md_color_tokens, design_md_type_scale, design_md_spacing_shapes, design_md_tailwind_v4_config, design_md_components [EXTRACTED 0.90]

## Communities

### Community 0 - "Architecture & Backend"
Cohesion: 0.06
Nodes (51): Coding Guidelines (Think, Simplicity, Surgical, Verify), Current Implementation State, AI Pipeline (Prompt Structures), API Contracts (Convex Mutations/Queries), Better Auth Component, CI Webhook to Test Run Flow, Convex Backend Component, Convex Configuration (Workpool + Better Auth) (+43 more)

### Community 1 - "UI Card Components"
Cohesion: 0.09
Nodes (31): Badge(), Calendar(), Card(), CardAction(), CardDescription(), CardFooter(), CardFrame(), CardFrameAction() (+23 more)

### Community 2 - "Convex Backend Functions"
Cohesion: 0.08
Nodes (10): createAuth(), requireUserId(), bytesToHex(), decrypt(), encrypt(), getKey(), hexToBytes(), parseFeatureMapResponse() (+2 more)

### Community 3 - "Worker Client API"
Cohesion: 0.15
Nodes (3): ConvexClient, Explorer, main()

### Community 4 - "Sidebar Navigation"
Cohesion: 0.22
Nodes (17): Sidebar(), SidebarContent(), SidebarFooter(), SidebarGroup(), SidebarGroupAction(), SidebarGroupContent(), SidebarGroupLabel(), SidebarHeader() (+9 more)

### Community 5 - "Command Palette"
Cohesion: 0.25
Nodes (13): CommandCollection(), CommandDialogBackdrop(), CommandDialogPopup(), CommandDialogTrigger(), CommandEmpty(), CommandFooter(), CommandGroupLabel(), CommandInput() (+5 more)

### Community 6 - "Pagination UI"
Cohesion: 0.39
Nodes (7): Pagination(), PaginationContent(), PaginationEllipsis(), PaginationItem(), PaginationLink(), PaginationNext(), PaginationPrevious()

### Community 7 - "Breadcrumb Navigation"
Cohesion: 0.39
Nodes (7): Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator()

### Community 8 - "Menu Component"
Cohesion: 0.39
Nodes (7): cn(), MenuGroupLabel(), MenuPopup(), MenuRadioItem(), MenuShortcut(), MenuSub(), MenuTrigger()

### Community 9 - "Select Dropdown"
Cohesion: 0.39
Nodes (7): SelectButton(), SelectGroup(), SelectItem(), SelectPopup(), SelectSeparator(), SelectTrigger(), SelectValue()

### Community 10 - "Toolbar Component"
Cohesion: 0.43
Nodes (6): Toolbar(), ToolbarButton(), ToolbarGroup(), ToolbarInput(), ToolbarLink(), ToolbarSeparator()

### Community 11 - "Media Query Hooks"
Cohesion: 0.57
Nodes (6): getServerSnapshot(), parseQuery(), resolveMax(), resolveMin(), useIsMobile(), useMediaQuery()

### Community 12 - "Alert Dialog"
Cohesion: 0.43
Nodes (6): AlertDialogBackdrop(), AlertDialogClose(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogPopup(), AlertDialogTrigger()

### Community 13 - "Form Field Component"
Cohesion: 0.48
Nodes (5): Field(), FieldDescription(), FieldError(), FieldItem(), FieldLabel()

### Community 14 - "Number Field"
Cohesion: 0.48
Nodes (5): CursorGrowIcon(), NumberField(), NumberFieldGroup(), NumberFieldIncrement(), NumberFieldScrubArea()

### Community 15 - "Table Component"
Cohesion: 0.48
Nodes (5): Table(), TableBody(), TableCell(), TableHeader(), TableRow()

### Community 16 - "Frame Component"
Cohesion: 0.48
Nodes (5): Frame(), FrameDescription(), FrameFooter(), FrameHeader(), FrameTitle()

### Community 17 - "Product & PRD Strategy"
Cohesion: 0.29
Nodes (7): Technology Stack Definition, Implementation Plan Overview, Problem Statement: Manual E2E Test Maintenance, Solution: AI-Powered E2E Testing, User Stories (25 Stories), AI-Powered E2E Test Platform, QA Engineers (Primary Users)

### Community 18 - "Alert Component"
Cohesion: 0.53
Nodes (4): Alert(), AlertAction(), AlertDescription(), AlertTitle()

### Community 19 - "Design System Tokens"
Cohesion: 0.47
Nodes (6): Color Token System, UI Components (Buttons, Cards, Tables, Nav), Spacing & Shape Tokens, Tailwind v4 Quick Start Config, Type Scale System, Accessibility & Inclusion (WCAG 2.1 AA)

### Community 20 - "Auth Pages"
Cohesion: 0.4
Nodes (1): onSubmit()

### Community 21 - "Group Component"
Cohesion: 0.6
Nodes (3): Group(), GroupSeparator(), GroupText()

### Community 22 - "Input Group"
Cohesion: 0.6
Nodes (3): InputGroup(), InputGroupText(), InputGroupTextarea()

### Community 23 - "Popover Component"
Cohesion: 0.6
Nodes (3): PopoverClose(), PopoverPopup(), PopoverTrigger()

### Community 24 - "Empty State"
Cohesion: 0.6
Nodes (3): Empty(), EmptyHeader(), EmptyMedia()

### Community 25 - "Dashboard Layout"
Cohesion: 0.67
Nodes (2): DashboardLayout(), SidebarItem()

### Community 26 - "Project Tests"
Cohesion: 0.67
Nodes (2): makeAuthed(), makeUnauthed()

### Community 27 - "Tabs Component"
Cohesion: 0.67
Nodes (2): Tabs(), TabsList()

### Community 28 - "Scroll Area"
Cohesion: 0.67
Nodes (2): ScrollArea(), ScrollBar()

### Community 29 - "Combobox Component"
Cohesion: 0.67
Nodes (2): cn(), Combobox()

### Community 30 - "Radio Group"
Cohesion: 0.67
Nodes (2): Radio(), RadioGroup()

### Community 31 - "Toast Notifications"
Cohesion: 0.67
Nodes (2): getSwipeDirection(), upsertReplayClassName()

### Community 32 - "Fieldset Component"
Cohesion: 0.67
Nodes (2): Fieldset(), FieldsetLegend()

### Community 33 - "Preview Card"
Cohesion: 0.67
Nodes (2): PreviewCardPopup(), PreviewCardTrigger()

### Community 34 - "Avatar Component"
Cohesion: 0.67
Nodes (2): Avatar(), AvatarFallback()

### Community 35 - "Proxy Module"
Cohesion: 0.67
Nodes (1): proxy()

### Community 36 - "Root Layout"
Cohesion: 0.67
Nodes (1): RootLayout()

### Community 37 - "Convex Client Provider"
Cohesion: 0.67
Nodes (1): ConvexClientProvider()

### Community 38 - "Settings Page"
Cohesion: 0.67
Nodes (1): handleSave()

### Community 39 - "Project Detail Page"
Cohesion: 0.67
Nodes (1): handleExtract()

### Community 40 - "Form Field Wrapper"
Cohesion: 0.67
Nodes (1): FormField()

### Community 41 - "Feature Map View"
Cohesion: 0.67
Nodes (1): FeatureMapView()

### Community 42 - "Auth Form Component"
Cohesion: 0.67
Nodes (1): AuthForm()

### Community 43 - "Create Project Dialog"
Cohesion: 0.67
Nodes (1): CreateProjectDialog()

### Community 44 - "PRD Upload Component"
Cohesion: 0.67
Nodes (1): PrdUpload()

### Community 45 - "Progress Bar"
Cohesion: 0.67
Nodes (1): Progress()

### Community 46 - "Sheet Panel"
Cohesion: 0.67
Nodes (1): SheetTrigger()

### Community 47 - "Meter Component"
Cohesion: 0.67
Nodes (1): Meter()

### Community 48 - "Accordion"
Cohesion: 0.67
Nodes (1): Accordion()

### Community 49 - "Tooltip"
Cohesion: 0.67
Nodes (1): TooltipTrigger()

### Community 50 - "Switch Toggle"
Cohesion: 0.67
Nodes (1): Switch()

### Community 51 - "Keyboard Shortcut"
Cohesion: 0.67
Nodes (1): Kbd()

### Community 52 - "Checkbox Group"
Cohesion: 0.67
Nodes (1): CheckboxGroup()

### Community 53 - "Dialog Component"
Cohesion: 0.67
Nodes (1): DialogTrigger()

### Community 54 - "OTP Field"
Cohesion: 0.67
Nodes (1): OTPField()

### Community 55 - "Separator"
Cohesion: 0.67
Nodes (1): Separator()

### Community 56 - "Button Component"
Cohesion: 0.67
Nodes (1): Button()

### Community 57 - "Toggle Component"
Cohesion: 0.67
Nodes (1): Toggle()

### Community 58 - "Spinner Loading"
Cohesion: 0.67
Nodes (1): Spinner()

### Community 59 - "Collapsible"
Cohesion: 0.67
Nodes (1): Collapsible()

### Community 60 - "Textarea"
Cohesion: 0.67
Nodes (1): Textarea()

### Community 61 - "Autocomplete"
Cohesion: 0.67
Nodes (1): cn()

### Community 62 - "Skeleton Loader"
Cohesion: 0.67
Nodes (1): Skeleton()

### Community 63 - "Form Component"
Cohesion: 0.67
Nodes (1): Form()

### Community 64 - "Brand & Visual Identity"
Cohesion: 0.67
Nodes (3): Clay Design System, Anti-references Design Rules, Brand Personality: Precise, Calm, Technical

### Community 65 - "Scope & Rationale"
Cohesion: 1.0
Nodes (3): Rationale: Skip Video in V1, Out of Scope (V2 Features), Testing Philosophy & Strategy

### Community 68 - "Worker State Machine"
Cohesion: 1.0
Nodes (2): Worker Registration & Heartbeat Flow, Worker State Machine

### Community 107 - "Misc 107"
Cohesion: 1.0
Nodes (1): System Context Diagram

### Community 108 - "Misc 108"
Cohesion: 1.0
Nodes (1): Container Diagram

### Community 109 - "Misc 109"
Cohesion: 1.0
Nodes (1): Deployment Architecture

### Community 110 - "Misc 110"
Cohesion: 1.0
Nodes (1): Explore Phase State Machine

### Community 111 - "Misc 111"
Cohesion: 1.0
Nodes (1): Satoshi Font (Primary)

### Community 112 - "Misc 112"
Cohesion: 1.0
Nodes (1): JetBrains Mono Font (Code)

### Community 113 - "Misc 113"
Cohesion: 1.0
Nodes (1): Issue Dependency Graph

### Community 114 - "Misc 114"
Cohesion: 1.0
Nodes (1): File Icon SVG (Document Icon)

### Community 115 - "Misc 115"
Cohesion: 1.0
Nodes (1): Vercel Logo SVG (Triangle)

### Community 116 - "Misc 116"
Cohesion: 1.0
Nodes (1): Next.js Logo SVG

## Knowledge Gaps
- **30 isolated node(s):** `AI-Powered E2E Test Platform`, `Brand Personality: Precise, Calm, Technical`, `Anti-references Design Rules`, `Accessibility & Inclusion (WCAG 2.1 AA)`, `System Context Diagram` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Auth Pages`** (5 nodes): `page.tsx`, `page.tsx`, `onSubmit()`, `page.tsx`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Dashboard Layout`** (4 nodes): `layout.tsx`, `DashboardLayout()`, `SidebarItem()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Project Tests`** (4 nodes): `projects.test.ts`, `makeAuthed()`, `makeUnauthed()`, `projects.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tabs Component`** (4 nodes): `tabs.tsx`, `Tabs()`, `TabsList()`, `tabs.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scroll Area`** (4 nodes): `scroll-area.tsx`, `ScrollArea()`, `ScrollBar()`, `scroll-area.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Combobox Component`** (4 nodes): `cn()`, `Combobox()`, `combobox.tsx`, `combobox.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Radio Group`** (4 nodes): `radio-group.tsx`, `Radio()`, `RadioGroup()`, `radio-group.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Toast Notifications`** (4 nodes): `toast.tsx`, `getSwipeDirection()`, `upsertReplayClassName()`, `toast.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fieldset Component`** (4 nodes): `fieldset.tsx`, `Fieldset()`, `FieldsetLegend()`, `fieldset.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Preview Card`** (4 nodes): `preview-card.tsx`, `PreviewCardPopup()`, `PreviewCardTrigger()`, `preview-card.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Avatar Component`** (4 nodes): `Avatar()`, `AvatarFallback()`, `avatar.tsx`, `avatar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Proxy Module`** (3 nodes): `proxy()`, `proxy.ts`, `proxy.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Root Layout`** (3 nodes): `layout.tsx`, `RootLayout()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Convex Client Provider`** (3 nodes): `ConvexClientProvider.tsx`, `ConvexClientProvider()`, `ConvexClientProvider.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Settings Page`** (3 nodes): `page.tsx`, `handleSave()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Project Detail Page`** (3 nodes): `page.tsx`, `handleExtract()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Field Wrapper`** (3 nodes): `form-field.tsx`, `FormField()`, `form-field.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Feature Map View`** (3 nodes): `feature-map-view.tsx`, `FeatureMapView()`, `feature-map-view.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Form Component`** (3 nodes): `AuthForm()`, `auth-form.tsx`, `auth-form.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Create Project Dialog`** (3 nodes): `create-project-dialog.tsx`, `CreateProjectDialog()`, `create-project-dialog.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PRD Upload Component`** (3 nodes): `prd-upload.tsx`, `PrdUpload()`, `prd-upload.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Progress Bar`** (3 nodes): `progress.tsx`, `Progress()`, `progress.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sheet Panel`** (3 nodes): `sheet.tsx`, `SheetTrigger()`, `sheet.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Meter Component`** (3 nodes): `meter.tsx`, `Meter()`, `meter.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Accordion`** (3 nodes): `Accordion()`, `accordion.tsx`, `accordion.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tooltip`** (3 nodes): `tooltip.tsx`, `TooltipTrigger()`, `tooltip.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Switch Toggle`** (3 nodes): `switch.tsx`, `Switch()`, `switch.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Keyboard Shortcut`** (3 nodes): `kbd.tsx`, `Kbd()`, `kbd.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Checkbox Group`** (3 nodes): `CheckboxGroup()`, `checkbox-group.tsx`, `checkbox-group.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Dialog Component`** (3 nodes): `dialog.tsx`, `DialogTrigger()`, `dialog.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `OTP Field`** (3 nodes): `otp-field.tsx`, `OTPField()`, `otp-field.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Separator`** (3 nodes): `separator.tsx`, `Separator()`, `separator.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Button Component`** (3 nodes): `Button()`, `button.tsx`, `button.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Toggle Component`** (3 nodes): `toggle.tsx`, `Toggle()`, `toggle.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Spinner Loading`** (3 nodes): `spinner.tsx`, `Spinner()`, `spinner.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Collapsible`** (3 nodes): `Collapsible()`, `collapsible.tsx`, `collapsible.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Textarea`** (3 nodes): `textarea.tsx`, `Textarea()`, `textarea.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Autocomplete`** (3 nodes): `cn()`, `autocomplete.tsx`, `autocomplete.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Skeleton Loader`** (3 nodes): `skeleton.tsx`, `Skeleton()`, `skeleton.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Component`** (3 nodes): `form.tsx`, `Form()`, `form.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Worker State Machine`** (2 nodes): `Worker Registration & Heartbeat Flow`, `Worker State Machine`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Misc 107`** (1 nodes): `System Context Diagram`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Misc 108`** (1 nodes): `Container Diagram`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Misc 109`** (1 nodes): `Deployment Architecture`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Misc 110`** (1 nodes): `Explore Phase State Machine`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Misc 111`** (1 nodes): `Satoshi Font (Primary)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Misc 112`** (1 nodes): `JetBrains Mono Font (Code)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Misc 113`** (1 nodes): `Issue Dependency Graph`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Misc 114`** (1 nodes): `File Icon SVG (Document Icon)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Misc 115`** (1 nodes): `Vercel Logo SVG (Triangle)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Misc 116`** (1 nodes): `Next.js Logo SVG`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `UI Card Components` to `Sidebar Navigation`, `Pagination UI`, `Breadcrumb Navigation`, `Select Dropdown`, `Group Component`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `PaginationLink()` connect `Pagination UI` to `UI Card Components`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `BreadcrumbLink()` connect `Breadcrumb Navigation` to `UI Card Components`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Are the 32 inferred relationships involving `cn()` (e.g. with `GroupText()` and `PaginationLink()`) actually correct?**
  _`cn()` has 32 INFERRED edges - model-reasoned connections that need verification._
- **What connects `AI-Powered E2E Test Platform`, `Brand Personality: Precise, Calm, Technical`, `Anti-references Design Rules` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Architecture & Backend` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `UI Card Components` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._