import Image from "next/image";

export const WelcomeContent = () => {
  return (
    <>
     <Image
        src="/logo.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
        className="hidden dark:block"
      />
      <Image
        src="/dark_logo.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
        className="block dark:hidden"
      />
      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mt-4">
        <li className="mb-2">
          Follow along the quickstart guide {" "}
          <a
            href="https://github.com/NillionNetwork/awesome-nillion/issues/2"
            target="_blank"
            className="underline"
            rel="noopener noreferrer"
          >
            here
          </a>
        </li>
        <li className="mb-2">
          Reach out to us on {" "}
          <a
            href="https://github.com/orgs/NillionNetwork/discussions"
            target="_blank"
            className="underline"
            rel="noopener noreferrer"
          >
            Github Discussions
          </a>
          {""} if you get stuck
        </li>
        <li>
          Make sure you are running
          <code className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md p-1 mx-1">
            nillion-devnet
          </code>
          in a separate terminal.
        </li>
      </ol>
    </>
  );
};
