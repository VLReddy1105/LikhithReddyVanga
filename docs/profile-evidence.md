# Profile content evidence — first redesign audit

Historical audit retained for context. The current V2 project selection, visual provenance and social verification are recorded in `project-evidence.md`, `social-evidence.md` and `portfolio-delivery.md`. Client project references below describe the earlier source audit, not public V2 showcases.

The redesign distinguishes confirmed identity, existing self-reported content and implementation evidence. Local source review establishes that code exists; it does not establish paid client engagements, production availability, research findings or attribution of every commit.

## Confirmed by the user

- M.Sc. Artificial Intelligence student at BTU Cottbus-Senftenberg.
- Research Assistant working on LLM interpretability and visualization.
- Full-stack and AI engineer; founder of VLR Technologies.
- MotionCB is **completed academic work at BTU**. The user designed and implemented deep learning pipelines for solar photovoltaic infrastructure mapping across Germany, using multispectral satellite/geospatial imagery, object detection, segmentation and QGIS. No end month was supplied, so none was added.
- LeadRadar is active, with Next.js / React / TypeScript, Python / FastAPI, DuckDB, Supabase / PostgreSQL and OSM / Overpass / Overture Maps. It is shared platform development; sole authorship is not claimed.
- A September 8, 2026 CV is withheld until recent work is reviewed; there is no download button.

## Preserved self-reported portfolio content

- BTU study: 2024–Present, now explicitly **In progress**.
- B.Tech CSE — Artificial Intelligence, Parul University, Gujarat, 2020–2024.
- Research Assistant: March 2026–Present at BTU.
- Historical internship: Full Stack Developer Intern, Dhalav’s Designers, Hyderabad, December 2023–March 2024. Next.js, API and retrieval/chatbot contributions are paraphrased from the previous ExperienceSection.
- Language proficiency labels are unchanged.

These dates, undergraduate details, internship attribution and language levels should be reconfirmed before broad publication. No new employers, employment dates, qualifications, awards, metrics or paid-client claims were inferred.

## Implementation evidence used for skill prioritization

Sibling repositories were inspected read-only:

- `../llm interpreter/README.md`, `apps/api/pyproject.toml`, `apps/api/src/llm_lab/`, `apps/web/package.json`: Next.js, React, TypeScript, FastAPI, Pydantic, PyTorch, Hugging Face Transformers, retained-tensor capture, Qwen3, attention, embeddings, residual and Logit Lens analysis. README reports Stage 6 and some Stage 7 source exists. Neither is represented as a newly verified acceptance result here.
- `../ai-voice-agent/README.md`, `backend/requirements.txt`, `frontend/package.json`: Faster-Whisper, Ollama Qwen chat, bounded session memory, FastAPI and Next.js. TTS, RAG and telephony are outside the currently documented implemented stage.
- `../vlr-tech/vlr-tech/package.json`, `backend/requirements.txt`, `backend/config/settings.py`: Next.js site, Django REST Framework, PostgreSQL configuration and inquiry/admin application structure.
- `../NextGen Community/NextGen/package.json`, `src/lib/supabase/`, `src/lib/auth/`: Next.js, React, TypeScript, Supabase and role-aware access workflows.
- `../mozzaitalia/README.md`, `package.json`: Next.js restaurant site, menu/cart, ordering handoff, Supabase order persistence and configurable WhatsApp automation. A configured phone number does not prove a live Meta API integration.
- `../kesikitchen/README.md`, `package.json`: Next.js menu, accessible cart, customer form and WhatsApp handoff. The README states no deployment/push, backend, payments, database or accounts.
- This portfolio’s contact API, SQL schema, Vercel configuration and package manifest demonstrate deployment configuration. Deployment and database readiness require separate validation.

## Content changes

- Removed arbitrary “4+ Years in AI”, “2 Degrees in AI”, “5+ Projects Built” and “3 Research Areas” statistics. Role context and education provide useful information without numerical claims.
- Separated academic research, completed academic projects, founder responsibilities, independent/client-facing project work and the historical employed internship.
- No inferred founder/client dates or production status. Client-facing describes the software audience, not payment or commissioned status.
- Six skill groups prioritize demonstrated tools, with no percentages or progress bars.
- Removed blanket current implementation claims about TransformerLens, Streamlit, Plotly, PCA, UMAP, t-SNE and several model families. Dimensionality reduction is planned work in the inspected LLM lab.

## Confirmation gaps

- Existing education/employment dates and historical internship contributions.
- Paid-client versus independent status and exact ownership/contribution for each business project.
- Any additional historical ML or dimensionality-reduction experience, supported by specific project evidence.
- No asset from neighboring `Resume_Maker_Latex` was used: it contains conflicting identities, institutions and employers. The user’s withheld CV should be reviewed separately.
