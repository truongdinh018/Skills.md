export type Department = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  /** Emoji used as a lightweight icon in cards and headers. */
  icon: string;
  /** Tailwind gradient classes used for accents. */
  gradient: string;
  /** Tailwind text/border/bg accent used for badges. */
  accent: {
    text: string;
    bg: string;
    ring: string;
  };
};

export const DEPARTMENTS: Department[] = [
  {
    slug: "engineering",
    name: "Kỹ thuật",
    shortName: "Kỹ thuật",
    description:
      "Quy trình phát triển phần mềm, review code, vận hành hệ thống và xử lý sự cố.",
    icon: "💻",
    gradient: "from-sky-500 to-indigo-500",
    accent: {
      text: "text-sky-700 dark:text-sky-300",
      bg: "bg-sky-50 dark:bg-sky-500/10",
      ring: "ring-sky-500/20",
    },
  },
  {
    slug: "marketing",
    name: "Marketing",
    shortName: "Marketing",
    description:
      "Xây dựng chiến dịch, content, SEO và đo lường hiệu quả truyền thông.",
    icon: "📣",
    gradient: "from-pink-500 to-rose-500",
    accent: {
      text: "text-rose-700 dark:text-rose-300",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      ring: "ring-rose-500/20",
    },
  },
  {
    slug: "sales",
    name: "Kinh doanh",
    shortName: "Kinh doanh",
    description:
      "Kịch bản bán hàng, quản lý pipeline, chăm sóc và chốt khách hàng.",
    icon: "🤝",
    gradient: "from-amber-500 to-orange-500",
    accent: {
      text: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      ring: "ring-amber-500/20",
    },
  },
  {
    slug: "hr",
    name: "Nhân sự",
    shortName: "Nhân sự",
    description:
      "Tuyển dụng, onboarding, đánh giá và phát triển nhân viên.",
    icon: "🧑‍💼",
    gradient: "from-violet-500 to-purple-500",
    accent: {
      text: "text-violet-700 dark:text-violet-300",
      bg: "bg-violet-50 dark:bg-violet-500/10",
      ring: "ring-violet-500/20",
    },
  },
  {
    slug: "finance",
    name: "Tài chính - Kế toán",
    shortName: "Tài chính",
    description:
      "Lập ngân sách, thanh toán, báo cáo và tuân thủ quy định tài chính.",
    icon: "📊",
    gradient: "from-emerald-500 to-teal-500",
    accent: {
      text: "text-emerald-700 dark:text-emerald-300",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      ring: "ring-emerald-500/20",
    },
  },
  {
    slug: "product",
    name: "Sản phẩm",
    shortName: "Sản phẩm",
    description:
      "Nghiên cứu người dùng, viết PRD, ưu tiên tính năng và roadmap.",
    icon: "🧭",
    gradient: "from-cyan-500 to-blue-500",
    accent: {
      text: "text-cyan-700 dark:text-cyan-300",
      bg: "bg-cyan-50 dark:bg-cyan-500/10",
      ring: "ring-cyan-500/20",
    },
  },
  {
    slug: "support",
    name: "Chăm sóc khách hàng",
    shortName: "CSKH",
    description:
      "Tiếp nhận, phân loại và xử lý yêu cầu hỗ trợ khách hàng.",
    icon: "🎧",
    gradient: "from-fuchsia-500 to-pink-500",
    accent: {
      text: "text-fuchsia-700 dark:text-fuchsia-300",
      bg: "bg-fuchsia-50 dark:bg-fuchsia-500/10",
      ring: "ring-fuchsia-500/20",
    },
  },
];

const DEPARTMENT_MAP = new Map(DEPARTMENTS.map((d) => [d.slug, d]));

export function getDepartment(slug: string): Department | undefined {
  return DEPARTMENT_MAP.get(slug);
}
