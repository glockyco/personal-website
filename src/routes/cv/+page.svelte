<script lang="ts">
  import { profile } from '$lib/data/links';
  import profilePhoto from '$lib/assets/profile.png';
  import { publications } from '$lib/data/publications';
  import { projects } from '$lib/data/projects';
  import {
    researchSummary,
    workExperience,
    education,
    teaching,
    supervision,
    academicService,
    skills,
    continuingEducation
  } from '$lib/data/cv';

  // All publications sorted: under-review first, then reverse-chronological
  const allPubs = [...publications].sort((a, b) => {
    if (a.status === 'under-review' && b.status !== 'under-review') return -1;
    if (a.status !== 'under-review' && b.status === 'under-review') return 1;
    return b.year - a.year;
  });

  // Teaching split by role
  const labInstructors = teaching.filter((t) => t.role === 'instructor');
  const tutors = teaching.filter((t) => t.role === 'ta');

  // Supervision grouped by type
  const mscTheses = supervision.filter((s) => s.type === 'msc-thesis');
  const mscProjects = supervision.filter((s) => s.type === 'msc-project');
  const bscTheses = supervision.filter((s) => s.type === 'bsc-thesis');
  const bscInterns = supervision.filter((s) => s.type === 'bsc-intern');
  const hsInterns = supervision.filter((s) => s.type === 'highschool-intern');

  // Service grouped
  const reviewerService = academicService.filter((s) => s.type === 'reviewer');
  const subreviewerService = academicService.filter((s) => s.type === 'subreviewer');
  const outreachService = academicService.filter((s) => s.type === 'outreach');

  // Formatted display strings for service grid
  const reviewerDisplay = reviewerService
    .map((s) => s.venue + (s.note ? ` (${s.note})` : ''))
    .join(', ');
  const subreviewerDisplay = subreviewerService
    .map((s) => `${s.venue} ${s.year}${s.count && s.count > 1 ? ` \u00d7${s.count}` : ''}`)
    .join(', ');

  // Supervision summary counts
  function ongoingLabel(items: typeof mscTheses): string {
    const ongoing = items.filter((s) => s.status === 'ongoing').length;
    if (ongoing === 0) return '';
    if (ongoing === items.length) return ` (all ${ongoing} ongoing)`;
    return ` (${ongoing} ongoing)`;
  }

  const supervisionCounts = [
    mscTheses.length > 0
      ? `${mscTheses.length} MSc ${mscTheses.length === 1 ? 'thesis' : 'theses'}${ongoingLabel(mscTheses)}`
      : null,
    mscProjects.length > 0
      ? `${mscProjects.length} MSc ${mscProjects.length === 1 ? 'project' : 'projects'}`
      : null,
    bscTheses.length > 0
      ? `${bscTheses.length} BSc ${bscTheses.length === 1 ? 'thesis' : 'theses'}`
      : null,
    bscInterns.length > 0 ? `${bscInterns.length} BSc interns` : null,
    hsInterns.length > 0 ? `${hsInterns.length} high-school interns` : null
  ].filter(Boolean);
</script>

<svelte:head>
  <title>CV &mdash; Johann Glock</title>
</svelte:head>

<!-- ── Page header ───────────────────────────────────────────────── -->
<div class="page-header" id="top">
  <div class="header-intro">
    <img class="avatar" src={profilePhoto} alt="Johann Glock" />
    <div class="header-text">
      <h1>{profile.name}</h1>
      <p class="header-subtitle">{profile.tagline}</p>
      <p class="header-meta">
        <a href={profile.affiliationUrl}>{profile.affiliation}</a>
        &middot; Advisor: Prof. Martin Pinzger &middot; Expected graduation: Q4 2026
      </p>
      <p class="header-summary">{researchSummary}</p>
    </div>
  </div>
  <div class="page-nav-row">
    <nav class="page-nav">
      <a class="page-nav-pill" href="#experience">Experience</a>
      <a class="page-nav-pill" href="#education">Education</a>
      <a class="page-nav-pill" href="#continuing-education">Continuing Education</a>
      <a class="page-nav-pill" href="#publications">Publications</a>
      <a class="page-nav-pill" href="#projects">Projects</a>
      <a class="page-nav-pill" href="#teaching">Teaching</a>
      <a class="page-nav-pill" href="#service">Service</a>
      <a class="page-nav-pill" href="#skills">Skills</a>
    </nav>
    <a class="pdf-link" href="/cv.pdf">Open PDF &darr;</a>
  </div>
</div>

<!-- ── Experience ───────────────────────────────────────────────── -->
<section class="section" id="experience">
  <div class="section-head">
    <span class="section-label">Experience</span>
  </div>

  <div class="entries">
    {#each workExperience as job (job.title + job.company)}
      <div class="entry">
        <div class="entry-date">
          <span class="date">
            {job.startYear}&ndash;{job.endYear ?? 'present'}
          </span>
        </div>
        <div class="entry-content">
          <div class="entry-title">{job.title}</div>
          <div class="entry-sub">{job.company} &middot; {job.location}</div>
          {#if job.highlights?.length}
            <ul class="entry-bullets">
              {#each job.highlights as highlight (highlight)}
                <li>{highlight}</li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- ── Education ────────────────────────────────────────────────── -->
<section class="section" id="education">
  <div class="section-head">
    <span class="section-label">Education</span>
  </div>

  <div class="entries">
    {#each education as edu (edu.degree + edu.institution)}
      <div class="entry">
        <div class="entry-date">
          <span class="date">
            {edu.startYear}&ndash;{edu.endYear ?? 'present'}
          </span>
        </div>
        <div class="entry-content">
          <div class="entry-title">{edu.degree} in {edu.field}</div>
          <div class="entry-sub">{edu.institution} &middot; {edu.location}</div>
          {#if edu.thesis}
            <div class="entry-detail">Thesis: <em>{edu.thesis}</em></div>
          {/if}
          {#if edu.theses}
            {#each edu.theses as t (t.label)}
              <div class="entry-detail">
                {t.label} thesis: <em>{t.title}</em>
              </div>
            {/each}
          {/if}
          {#if edu.advisor}
            <div class="entry-detail">Advisor: {edu.advisor}</div>
          {/if}
          {#if edu.distinction || edu.scholarship || edu.gpa}
            <div class="entry-chips">
              {#if edu.distinction}
                <span class="chip chip-accent">{edu.distinction}</span>
              {/if}
              {#if edu.scholarship}
                <span class="chip chip-muted">{edu.scholarship}</span>
              {/if}
              {#if edu.gpa}
                <span class="chip chip-muted">GPA {edu.gpa}</span>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- ── Continuing Education ──────────────────────────────────────── -->
<section class="section" id="continuing-education">
  <div class="section-head">
    <span class="section-label">Continuing Education</span>
  </div>

  <p class="cont-ed-summary">Doctoral training and self-study courses.</p>

  <div class="cont-ed-grid">
    {#each continuingEducation as entry (entry.category)}
      <div class="cont-ed-row">
        <span class="cont-ed-category">{entry.category}</span>
        <span class="cont-ed-providers">{entry.providers.join(', ')}</span>
        <span class="cont-ed-units">{entry.hours} hours</span>
      </div>
    {/each}
  </div>
</section>

<!-- ── Publications ─────────────────────────────────────────────── -->
<section class="section" id="publications">
  <div class="section-head">
    <span class="section-label">Publications</span>
    <a class="section-more" href="/research/">Publication details &rarr;</a>
  </div>

  <div class="pub-list">
    {#each allPubs as pub (pub.slug)}
      <div class="pub-row">
        <div class="pub-title">
          <a href="/research/{pub.slug}/">{pub.title}</a>
        </div>
        <div class="pub-meta">
          <span class="pub-authors">
            {#each pub.authors as author, i (author.name)}
              {#if i > 0},
              {/if}
              {#if author.isMe}<strong>{author.name}</strong>{:else}{author.name}{/if}
            {/each}
          </span>
          <span class="pub-venue">
            {#if pub.status === 'under-review'}
              <span class="badge badge-review">Under Review</span>
            {:else}
              <span class="badge badge-accent">{pub.venueShort}</span>
              <span class="badge badge-year">{pub.year}</span>
            {/if}
          </span>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- ── Software Projects ────────────────────────────────────────── -->
<section class="section" id="projects">
  <div class="section-head">
    <span class="section-label">Software Projects</span>
    <a class="section-more" href="/projects/">Project details &rarr;</a>
  </div>

  <div class="project-list">
    {#each projects as project (project.slug)}
      <div class="project-row">
        <div class="project-title">
          <a href="/projects/{project.slug}/">{project.title}</a>
          <span
            class="project-status"
            class:status-inactive={project.status === 'inactive' || project.status === 'archived'}
          >
            <span class="status-dot"></span>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        <div class="project-tagline">{project.tagline}</div>
        <div class="project-tech">{project.techStack.join(', ')}</div>
      </div>
    {/each}
  </div>
</section>

<!-- ── Teaching & Supervision ──────────────────────────────────── -->
<section class="section" id="teaching">
  <div class="section-head">
    <span class="section-label">Teaching &amp; Supervision</span>
  </div>

  <div class="teaching-block">
    {#if labInstructors.length}
      <div class="sub-label">Lab Instructor</div>
      {#each labInstructors as course (course.course)}
        <div class="compact-row">
          <span class="compact-title">{course.course}</span>
          <span class="compact-meta">
            {course.institution} &middot; {course.semesters.length}
            {course.semesters.length === 1 ? 'semester' : 'semesters'}
          </span>
          {#if course.topics}
            <span class="compact-meta compact-meta--topics">{course.topics}</span>
          {/if}
        </div>
      {/each}
    {/if}

    {#if tutors.length}
      <div class="sub-label">Tutor</div>
      {#each tutors as course (course.course)}
        <div class="compact-row">
          <span class="compact-title">{course.course}</span>
          <span class="compact-meta">
            {course.institution} &middot; {course.semesters.length}
            {course.semesters.length === 1 ? 'semester' : 'semesters'}
          </span>
        </div>
      {/each}
    {/if}

    <div class="sub-label">Supervision</div>
    <p class="supervision-summary">
      {supervisionCounts.join(' · ')}
    </p>

    {#if mscTheses.length}
      <div class="supervision-type">MSc Theses</div>
      {#each mscTheses as s (s.name)}
        <div class="supervision-row">
          <span class="supervision-name">{s.name}</span>
          {#if s.status === 'ongoing'}<span class="chip chip-accent">Ongoing</span>{/if}
          {#if s.topic}<span class="supervision-topic">{s.topic}</span>{/if}
        </div>
      {/each}
    {/if}

    {#if mscProjects.length}
      <div class="supervision-type">MSc Projects</div>
      {#each mscProjects as s (s.name)}
        <div class="supervision-row">
          <span class="supervision-name">{s.name}</span>
          {#if s.topic}<span class="supervision-topic">{s.topic}</span>{/if}
        </div>
      {/each}
    {/if}

    {#if bscTheses.length}
      <div class="supervision-type">BSc Theses</div>
      {#each bscTheses as s (s.name)}
        <div class="supervision-row">
          <span class="supervision-name">{s.name}</span>
          {#if s.topic}<span class="supervision-topic">{s.topic}</span>{/if}
        </div>
      {/each}
    {/if}

    {#if bscInterns.length || hsInterns.length}
      <div class="supervision-type">Internship Mentoring</div>
      <p class="supervision-interns">
        {bscInterns.length} BSc interns (AIST/i2f project) and {hsInterns.length} high-school interns
        (FFG summer internships at AAU)
      </p>
    {/if}
  </div>
</section>

<!-- ── Service & Outreach ─────────────────────────────────────────── -->
<section class="section" id="service">
  <div class="section-head">
    <span class="section-label">Service &amp; Outreach</span>
  </div>

  <div class="service-grid">
    {#if reviewerService.length}
      <div class="service-row">
        <span class="service-role">Reviewer</span>
        <div class="service-detail">{reviewerDisplay}</div>
      </div>
    {/if}
    {#if subreviewerService.length}
      <div class="service-row">
        <span class="service-role">Sub-reviewer</span>
        <div class="service-detail">{subreviewerDisplay}</div>
      </div>
    {/if}
    {#if outreachService.length}
      <div class="service-row">
        <span class="service-role">Outreach</span>
        <div class="service-detail">
          {#each outreachService as s (s.venue)}
            <div class="service-outreach-item">
              <span class="service-venue"
                >{s.venue}{#if s.year}
                  ({s.year}){/if}</span
              >
              {#if s.note}
                — {s.note}{/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>

<!-- ── Skills ───────────────────────────────────────────────────── -->
<section class="section" id="skills">
  <div class="section-head">
    <span class="section-label">Skills</span>
  </div>

  <div class="skills-grid">
    {#each skills as group (group.category)}
      <div class="skill-group">
        <div class="skill-category">{group.category}</div>
        <div class="chip-flow">
          {#each group.items as item (item)}
            <span class="chip chip-muted">{item}</span>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  /* ── Page header ── */
  .page-header {
    padding: 48px 0 20px;
  }

  .header-intro {
    display: flex;
    gap: 40px;
    align-items: flex-start;
  }

  .avatar {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center top;
    flex-shrink: 0;
    border: 3px solid var(--color-border);
    transition: border-color var(--transition-base);
  }

  .header-text {
    flex: 1;
    min-width: 0;
  }

  h1 {
    font-size: var(--text-3xl);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin-bottom: 8px;
  }

  .header-subtitle {
    font-size: var(--text-lg);
    color: var(--color-muted);
    margin-bottom: 8px;
  }

  .header-meta {
    font-size: var(--text-sm);
    color: var(--color-muted);
    margin-bottom: 16px;

    a {
      color: var(--color-muted);
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-color: var(--color-link-underline);

      &:hover {
        color: var(--color-accent);
      }
    }
  }

  .header-summary {
    font-size: var(--text-sm);
    color: var(--color-text);
    line-height: 1.6;
    max-width: 680px;
  }

  .page-nav-row {
    display: flex;
    align-items: baseline;
    gap: 16px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--color-border);
    transition: border-color var(--transition-base);

    @media (max-width: 768px) {
      flex-wrap: wrap;
      gap: 12px;

      .pdf-link {
        order: -1;
        width: 100%;
        justify-content: center;
      }
    }
  }

  .page-nav {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    flex: 1;
  }

  .pdf-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border-radius: 20px;
    border: 1.5px solid var(--color-accent);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-accent);
    white-space: nowrap;
    flex-shrink: 0;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--color-accent);
      color: #fff;
    }
  }

  .page-nav-pill {
    display: inline-flex;
    align-items: center;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: var(--text-xs);
    font-weight: 600;
    background: var(--color-tag-bg);
    color: var(--color-tag-text);
    text-decoration: none;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--color-accent-dim);
      color: var(--color-accent);
    }
  }

  /* ── Sections ── */
  .section {
    padding: 40px 0;
    border-top: 1px solid var(--color-border);
    scroll-margin-top: 72px;
    transition: border-color var(--transition-base);
  }

  .section-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .section-label {
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .section-more {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-accent);

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }

  /* ── Pattern A: Timeline entries (Experience, Education) ── */
  .entries {
    display: flex;
    flex-direction: column;
  }

  .entry {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 0 24px;
    padding: 16px 0;
    border-bottom: 1px solid var(--color-border);
    transition: border-color var(--transition-base);

    &:last-child {
      border-bottom: none;
    }
  }

  .entry-date {
    padding-top: 2px;
  }

  .date {
    font-size: var(--text-sm);
    color: var(--color-muted);
    white-space: nowrap;
  }

  .entry-content {
    min-width: 0;
  }

  .entry-title {
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--color-heading);
    margin-bottom: 2px;
  }

  .entry-sub {
    font-size: var(--text-sm);
    color: var(--color-muted);
    margin-bottom: 4px;
  }

  .entry-detail {
    font-size: var(--text-sm);
    color: var(--color-text);
    margin-bottom: 4px;
    line-height: 1.5;

    em {
      font-style: italic;
    }
  }

  .entry-bullets {
    font-size: var(--text-sm);
    color: var(--color-text);
    line-height: 1.6;
    padding-left: 18px;
    margin: 6px 0 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .entry-chips {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  /* ── Pattern B: Compact rows (Teaching, Supervision) ── */
  .compact-row {
    padding: 6px 0;
    border-bottom: 1px solid var(--color-border);
    transition: border-color var(--transition-base);

    &:last-child {
      border-bottom: none;
    }
  }

  .compact-title {
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--color-heading);
    display: block;
    margin-bottom: 1px;
  }

  .compact-meta {
    font-size: var(--text-sm);
    color: var(--color-muted);
    display: block;
  }

  .compact-meta--topics {
    font-style: italic;
  }

  .sub-label {
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin: 20px 0 10px;

    &:first-child {
      margin-top: 0;
    }
  }

  /* ── Pattern C: Inline flow (Chips, badges) ── */
  .chip-flow {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: var(--text-xs);
    font-weight: 600;
    white-space: nowrap;
  }

  .chip-accent {
    background: var(--color-badge-bg);
    color: var(--color-badge-text);
  }

  .chip-muted {
    background: var(--color-tag-bg);
    color: var(--color-tag-text);
  }

  /* ── Publications ── */
  .pub-list {
    display: flex;
    flex-direction: column;
  }

  .pub-row {
    padding: 12px 0;
    border-bottom: 1px solid var(--color-border);
    transition: border-color var(--transition-base);

    &:last-child {
      border-bottom: none;
    }
  }

  .pub-title {
    font-size: var(--text-base);
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 4px;

    a {
      color: var(--color-accent);

      &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
        text-decoration-color: var(--color-link-underline);
      }
    }
  }

  .pub-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .pub-authors {
    font-size: var(--text-sm);
    color: var(--color-muted);

    strong {
      color: var(--color-text);
      font-weight: 600;
    }
  }

  .pub-venue {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: var(--text-xs);
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  .badge-accent {
    background: var(--color-badge-bg);
    color: var(--color-badge-text);
  }

  .badge-year {
    background: var(--color-tag-bg);
    color: var(--color-tag-text);
  }

  .badge-review {
    background: oklch(70% 0.15 55 / 0.15);
    color: oklch(55% 0.15 55);
  }

  /* ── Software Projects ── */
  .project-list {
    display: flex;
    flex-direction: column;
  }

  .project-row {
    padding: 10px 0;
    border-bottom: 1px solid var(--color-border);
    transition: border-color var(--transition-base);

    &:last-child {
      border-bottom: none;
    }
  }

  .project-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 2px;

    a {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--color-accent);

      &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
        text-decoration-color: var(--color-link-underline);
      }
    }
  }

  .project-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-status-active);
    white-space: nowrap;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    background: var(--color-status-active);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .status-inactive {
    color: var(--color-muted);

    .status-dot {
      background: var(--color-muted);
    }
  }

  .project-tagline {
    font-size: var(--text-sm);
    color: var(--color-muted);
    line-height: 1.5;
  }

  .project-tech {
    font-size: var(--text-xs);
    font-style: italic;
    color: var(--color-muted);
    line-height: 1.5;
    margin-top: 2px;
  }

  /* ── Teaching & Supervision ── */
  .teaching-block {
    display: flex;
    flex-direction: column;
  }

  .supervision-summary {
    font-size: var(--text-sm);
    color: var(--color-muted);
    margin-bottom: 16px;
  }

  .supervision-type {
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-muted);
    margin: 12px 0 6px;

    &:first-of-type {
      margin-top: 0;
    }
  }

  .supervision-row {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    padding: 4px 0;

    .chip {
      margin-left: 6px;
    }
  }

  .supervision-name {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-heading);
  }

  .supervision-topic {
    font-size: var(--text-sm);
    color: var(--color-muted);

    &::before {
      content: '\00a0\2014\00a0';
    }
  }

  .supervision-interns {
    font-size: var(--text-sm);
    color: var(--color-muted);
    line-height: 1.5;
  }

  /* ── Skills ── */
  .skills-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .skill-group {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 0 24px;
    align-items: start;
  }

  .skill-category {
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--color-heading);
    padding-top: 4px;
  }

  /* ── Continuing Education ── */
  .cont-ed-summary {
    font-size: var(--text-sm);
    color: var(--color-muted);
    margin-bottom: 16px;
  }

  .cont-ed-grid {
    display: flex;
    flex-direction: column;
  }

  .cont-ed-row {
    display: grid;
    grid-template-columns: 1fr 120px 70px;
    gap: 0 24px;
    align-items: baseline;
    padding: 6px 0;
    border-bottom: 1px solid var(--color-border);
    transition: border-color var(--transition-base);

    &:last-child {
      border-bottom: none;
    }
  }

  .cont-ed-category {
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--color-heading);
  }

  .cont-ed-providers {
    font-size: var(--text-sm);
    color: var(--color-muted);
    white-space: nowrap;
    text-align: right;
  }

  .cont-ed-units {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-heading);
    white-space: nowrap;
    text-align: right;
  }

  /* ── Service & Outreach ── */
  .service-grid {
    display: flex;
    flex-direction: column;
  }

  .service-row {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 0 24px;
    align-items: baseline;
    padding: 6px 0;
    border-bottom: 1px solid var(--color-border);
    transition: border-color var(--transition-base);

    &:last-child {
      border-bottom: none;
    }
  }

  .service-role {
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--color-heading);
  }

  .service-detail {
    font-size: var(--text-sm);
    color: var(--color-muted);
    line-height: 1.5;
  }

  .service-venue {
    font-weight: 600;
  }

  .service-outreach-item {
    padding: 2px 0;
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .page-header {
      padding: 32px 0 16px;
    }

    .header-intro {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 20px;
    }

    .avatar {
      width: 88px;
      height: 88px;
    }

    h1 {
      font-size: 2rem;
    }

    .entry {
      grid-template-columns: 1fr;
      gap: 4px;
    }

    .entry-date {
      padding-top: 0;
    }

    .skill-group {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .cont-ed-row {
      grid-template-columns: 1fr;
      gap: 2px;
    }

    .cont-ed-providers {
      text-align: left;
    }

    .cont-ed-units {
      text-align: left;
    }

    .service-row {
      grid-template-columns: 1fr;
      gap: 2px;
    }
  }
</style>
