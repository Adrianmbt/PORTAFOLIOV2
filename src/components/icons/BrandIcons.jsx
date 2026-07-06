export function Github(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.34 6.52-1.6 6.52-7.09a5.5 5.5 0 0 0-1.5-3.8 5.4 5.4 0 0 0-.15-3.8s-1.18-.38-3.9 1.4a13.1 13.1 0 0 0-7 0C6.27 2.22 5.09 2.6 5.09 2.6a5.4 5.4 0 0 0-.15 3.8A5.5 5.5 0 0 0 3.44 10.2c0 5.48 3.33 6.75 6.52 7.09a4.8 4.8 0 0 0-1 3.03v4" />
    </svg>
  );
}

export function Linkedin(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
