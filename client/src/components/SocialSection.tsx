import { ArrowUpRight, BookOpen, Github, Linkedin, Star } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import {
  linkedinPosts,
  linkedinProfile,
  repositoryContext,
} from "@/data/social";
import { useGitHubProfile } from "@/hooks/useGitHubProfile";
import "./social.css";
import GitHubContributions from "./GitHubContributions";
const date = (value: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(new Date(value));

export default function SocialSection() {
  const { ref, data, state } = useGitHubProfile();
  return (
    <section
      ref={ref}
      id="updates"
      className="portfolio-section social-section"
      aria-label="Professional profiles and public updates"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Beyond the portfolio"
            title="Thoughts, research & updates."
            description="The work in progress, the ideas behind it, and the code that connects them."
          />
        </Reveal>
        <div className="social-grid">
          <Reveal className="social-panel">
            <article className="linkedin-panel">
              <div className="social-panel-heading">
                <Linkedin size={21} aria-hidden="true" />
                <span>Research & perspective</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </div>
              <div className="linkedin-cover" aria-hidden="true">
                <span>
                  Research.
                  <br />
                  Build. Share.
                </span>
                <i />
                <i />
                <i />
              </div>
              <div className="social-profile">
                <img
                  src="/images/profile-vlr-640.webp"
                  width={64}
                  height={64}
                  alt="Likhith Reddy Vanga"
                  loading="lazy"
                />
                <div>
                  <h3>{linkedinProfile.name}</h3>
                  <p>{linkedinProfile.headline ?? linkedinProfile.context}</p>
                </div>
              </div>
              {linkedinPosts.length ? (
                <div className="linkedin-posts">
                  {linkedinPosts.slice(0, 3).map(post => (
                    <a
                      className="linkedin-post"
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={post.url}
                      aria-label={`${post.title} — view on LinkedIn (opens in a new tab)`}
                    >
                      {post.image && (
                        <img
                          src={post.image.src}
                          alt={post.image.alt}
                          loading="lazy"
                          width={540}
                          height={300}
                          onError={event => {
                            event.currentTarget.style.visibility = "hidden";
                          }}
                        />
                      )}
                      <div className="post-meta">
                        <span>{post.tag}</span>
                        {post.publishedAt && (
                          <time dateTime={post.publishedAt}>
                            {date(post.publishedAt)}
                          </time>
                        )}
                      </div>
                      <h4>{post.title}</h4>
                      <p>{post.excerpt}</p>
                      <span className="text-link">
                        View on LinkedIn{" "}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="linkedin-fallback">
                  <BookOpen size={26} aria-hidden="true" />
                  <h4>Follow the thinking behind the work.</h4>
                  <p>
                    Connect on LinkedIn for research, engineering and
                    professional updates.
                  </p>
                </div>
              )}
              {linkedinPosts.length > 0 && (
                <p className="social-note">
                  Selected public posts · manually curated
                </p>
              )}
              <a
                href={linkedinProfile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary social-cta"
              >
                Explore my LinkedIn{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          </Reveal>
          <Reveal className="social-panel" delay={0.08}>
            <article className="github-panel">
              <a
                href="https://github.com/VLReddy1105"
                target="_blank"
                rel="noopener noreferrer"
                className="social-panel-heading github-profile-header"
                aria-label="GitHub profile of VLReddy1105"
              >
                <Github size={21} aria-hidden="true" />
                <span>Code & engineering</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <div className="github-intro">
                <p className="eyebrow">Public source / selected repositories</p>
                <h3>
                  Built with curiosity.
                  <br />
                  <span>Backed by code.</span>
                </h3>
              </div>
              <div className="social-profile">
                <img
                  src={data.profile.avatar_url}
                  width={64}
                  height={64}
                  alt={`${data.profile.login} GitHub avatar`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={event => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/images/profile-vlr-640.webp";
                  }}
                />
                <div>
                  <h3>
                    <a
                      href={data.profile.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.profile.name ?? data.profile.login}
                    </a>
                  </h3>
                  <a
                    href={data.profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{data.profile.login}
                  </a>
                </div>
              </div>
              {data.profile.bio && (
                <p className="github-bio">{data.profile.bio}</p>
              )}
              <GitHubContributions />
              <div className="github-repositories">
                {data.repositories.map(repo => (
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-repository"
                    key={repo.full_name}
                  >
                    <div>
                      <BookOpen size={16} aria-hidden="true" />
                      <h4>{repo.name}</h4>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </div>
                    {(repo.description || repositoryContext[repo.name]) && (
                      <p>{repo.description ?? repositoryContext[repo.name]}</p>
                    )}
                    <div className="repository-meta">
                      {repo.language && (
                        <span>
                          <i
                            className={
                              repo.language === "Python"
                                ? "lang-python"
                                : "lang-typescript"
                            }
                          />
                          {repo.language}
                        </span>
                      )}
                      <span>
                        <Star size={12} aria-hidden="true" />
                        {repo.stargazers_count}{" "}
                        {repo.stargazers_count === 1 ? "star" : "stars"}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
              {!!data.activity?.length && (
                <div className="github-activity">
                  <p className="eyebrow">Recent public activity</p>
                  {data.activity.map(event => (
                    <a
                      key={event.id}
                      href={`https://github.com/${event.repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>
                        {event.type
                          .replace(/Event$/, "")
                          .replace(/([a-z])([A-Z])/g, "$1 $2")}{" "}
                        · {event.repo.name.split("/")[1]}
                      </span>
                      <time dateTime={event.created_at}>
                        {date(event.created_at)}
                      </time>
                    </a>
                  ))}
                  <p className="social-note">
                    GitHub public events may be delayed.
                  </p>
                </div>
              )}
              <p className="social-note" aria-live="polite">
                {state === "checking"
                  ? "Checking GitHub · verified snapshot shown"
                  : state === "updated"
                    ? "Updated from GitHub"
                    : state === "offline"
                      ? "GitHub unavailable · verified snapshot shown"
                      : state === "cached"
                        ? "Cached public GitHub data"
                        : "Verified GitHub snapshot"}{" "}
                · {date(data.fetchedAt)}
              </p>
              <a
                href={data.profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary social-cta"
              >
                View GitHub Profile{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
