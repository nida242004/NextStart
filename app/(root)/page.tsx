import React from "react";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const posts = await client.fetch(STARTUP_QUERY);
  console.log(JSON.stringify(posts, null, 2));
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your Startup,
          <br /> Connect with Entreprenaurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit idea , Vote on Pitches, and get Noticed in Virtual
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for "${query}"` : "Latest Startups"}
        </p>
        <ul className="mt-7 card_grid">
        {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No StartUps found</p>
          )}
        </ul>
      </section>
    </>
  );
}
