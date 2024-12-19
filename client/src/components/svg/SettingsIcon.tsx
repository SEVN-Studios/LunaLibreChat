export default function SettingsIcon({
  size = 25,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_50_103)">
        <path d="M10.1401 13.2865C11.5208 13.2865 12.6401 12.1672 12.6401 10.7865C12.6401 9.40579 11.5208 8.2865 10.1401 8.2865C8.75942 8.2865 7.64014 9.40579 7.64014 10.7865C7.64014 12.1672 8.75942 13.2865 10.1401 13.2865Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.3067 13.2865C16.1958 13.5379 16.1627 13.8167 16.2117 14.087C16.2607 14.3573 16.3896 14.6068 16.5817 14.8032L16.6317 14.8532C16.7867 15.008 16.9096 15.1918 16.9935 15.3941C17.0774 15.5964 17.1205 15.8133 17.1205 16.0323C17.1205 16.2514 17.0774 16.4682 16.9935 16.6706C16.9096 16.8729 16.7867 17.0567 16.6317 17.2115C16.4769 17.3665 16.2931 17.4894 16.0908 17.5733C15.8885 17.6571 15.6716 17.7003 15.4526 17.7003C15.2335 17.7003 15.0167 17.6571 14.8143 17.5733C14.612 17.4894 14.4282 17.3665 14.2734 17.2115L14.2234 17.1615C14.027 16.9694 13.7775 16.8405 13.5072 16.7915C13.2369 16.7425 12.9581 16.7756 12.7067 16.8865C12.4602 16.9921 12.25 17.1675 12.102 17.3911C11.9539 17.6147 11.8745 17.8767 11.8734 18.1448V18.2865C11.8734 18.7285 11.6978 19.1525 11.3852 19.465C11.0727 19.7776 10.6487 19.9532 10.2067 19.9532C9.76469 19.9532 9.34077 19.7776 9.02821 19.465C8.71565 19.1525 8.54005 18.7285 8.54005 18.2865V18.2115C8.5336 17.9357 8.44432 17.6682 8.28381 17.4438C8.12331 17.2193 7.899 17.0484 7.64005 16.9532C7.38871 16.8422 7.10989 16.8092 6.83956 16.8582C6.56924 16.9072 6.31979 17.0361 6.12339 17.2282L6.07339 17.2782C5.9186 17.4331 5.73479 17.5561 5.53246 17.6399C5.33013 17.7238 5.11325 17.767 4.89422 17.767C4.6752 17.767 4.45832 17.7238 4.25599 17.6399C4.05366 17.5561 3.86984 17.4331 3.71506 17.2782C3.56009 17.1234 3.43716 16.9396 3.35329 16.7372C3.26942 16.5349 3.22624 16.318 3.22624 16.099C3.22624 15.88 3.26942 15.6631 3.35329 15.4608C3.43716 15.2584 3.56009 15.0746 3.71506 14.9198L3.76505 14.8698C3.95717 14.6734 4.08604 14.424 4.13506 14.1537C4.18407 13.8833 4.15098 13.6045 4.04005 13.3532C3.93442 13.1067 3.75902 12.8965 3.53544 12.7484C3.31187 12.6004 3.04988 12.5209 2.78172 12.5198H2.64006C2.19803 12.5198 1.7741 12.3442 1.46154 12.0317C1.14898 11.7191 0.973389 11.2952 0.973389 10.8532C0.973389 10.4111 1.14898 9.98722 1.46154 9.67466C1.7741 9.3621 2.19803 9.18651 2.64006 9.18651H2.71506C2.99088 9.18006 3.25839 9.09077 3.4828 8.93027C3.70722 8.76976 3.87815 8.54545 3.97339 8.28651C4.08432 8.03516 4.11741 7.75635 4.06839 7.48602C4.01938 7.21569 3.8905 6.96624 3.69839 6.76984L3.64839 6.71984C3.49343 6.56505 3.3705 6.38124 3.28662 6.17891C3.20275 5.97658 3.15958 5.7597 3.15958 5.54068C3.15958 5.32165 3.20275 5.10477 3.28662 4.90244C3.3705 4.70011 3.49343 4.5163 3.64839 4.36151C3.80318 4.20655 3.98699 4.08362 4.18932 3.99974C4.39165 3.91587 4.60853 3.8727 4.82755 3.8727C5.04658 3.8727 5.26346 3.91587 5.46579 3.99974C5.66812 4.08362 5.85193 4.20655 6.00672 4.36151L6.05672 4.41151C6.25312 4.60362 6.50257 4.7325 6.7729 4.78151C7.04323 4.83053 7.32204 4.79744 7.57339 4.68651H7.64005C7.88653 4.58087 8.09674 4.40547 8.2448 4.1819C8.39286 3.95832 8.47232 3.69633 8.47339 3.42818V3.28651C8.47339 2.84448 8.64898 2.42056 8.96154 2.108C9.2741 1.79544 9.69803 1.61984 10.1401 1.61984C10.5821 1.61984 11.006 1.79544 11.3186 2.108C11.6311 2.42056 11.8067 2.84448 11.8067 3.28651V3.36151C11.8078 3.62966 11.8872 3.89166 12.0353 4.11523C12.1834 4.33881 12.3936 4.51421 12.6401 4.61984C12.8914 4.73077 13.1702 4.76386 13.4405 4.71485C13.7109 4.66583 13.9603 4.53696 14.1567 4.34484L14.2067 4.29484C14.3615 4.13988 14.5453 4.01695 14.7477 3.93308C14.95 3.8492 15.1669 3.80603 15.3859 3.80603C15.6049 3.80603 15.8218 3.8492 16.0241 3.93308C16.2265 4.01695 16.4103 4.13988 16.5651 4.29484C16.72 4.44963 16.8429 4.63344 16.9268 4.83578C17.0107 5.03811 17.0539 5.25498 17.0539 5.47401C17.0539 5.69303 17.0107 5.90991 16.9268 6.11224C16.8429 6.31457 16.72 6.49839 16.5651 6.65318L16.5151 6.70318C16.3229 6.89957 16.1941 7.14902 16.1451 7.41935C16.096 7.68968 16.1291 7.9685 16.2401 8.21984V8.28651C16.3457 8.53298 16.5211 8.74319 16.7447 8.89125C16.9682 9.03932 17.2302 9.11877 17.4984 9.11984H17.6401C18.0821 9.11984 18.506 9.29544 18.8186 9.608C19.1311 9.92056 19.3067 10.3445 19.3067 10.7865C19.3067 11.2285 19.1311 11.6525 18.8186 11.965C18.506 12.2776 18.0821 12.4532 17.6401 12.4532H17.5651C17.2969 12.4542 17.0349 12.5337 16.8113 12.6818C16.5878 12.8298 16.4124 13.04 16.3067 13.2865Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_50_103">
          <rect width="20" height="20" fill="inherit" transform="translate(0.140137 0.786499)"/>
        </clipPath>
      </defs>
    </svg>
  );
}