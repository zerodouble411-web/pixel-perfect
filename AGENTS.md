<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules

- All UI data is read through `src/lib/api.ts`, never imported directly into route components except for SEO/head metadata — so the mock layer can be swapped for the live Laravel API by flipping `USE_API`.
- Mock data shapes in `src/lib/portfolio-data.ts` must stay identical to `backend/API_CONTRACT.md`; change both together.
- `backend/` holds the Laravel 12 API scaffold. It is not built or run by the frontend toolchain.
- Colors, gradients and shadows come from tokens in `src/styles.css`; components never hardcode color utilities.
