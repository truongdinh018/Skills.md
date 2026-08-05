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
  // --- Phòng ban đặc thù công ty xây dựng ---
  {
    slug: "site-management",
    name: "Ban chỉ huy công trường",
    shortName: "Chỉ huy CT",
    description:
      "Điều hành công trường: giao ban, tiến độ, phối hợp thầu phụ và báo cáo.",
    icon: "🏗️",
    gradient: "from-orange-500 to-amber-500",
    accent: {
      text: "text-orange-700 dark:text-orange-300",
      bg: "bg-orange-50 dark:bg-orange-500/10",
      ring: "ring-orange-500/20",
    },
  },
  {
    slug: "construction-tech",
    name: "Kỹ thuật thi công",
    shortName: "KT thi công",
    description:
      "Triển khai bản vẽ, biện pháp thi công và nghiệm thu kỹ thuật tại hiện trường.",
    icon: "📐",
    gradient: "from-blue-500 to-cyan-500",
    accent: {
      text: "text-blue-700 dark:text-blue-300",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      ring: "ring-blue-500/20",
    },
  },
  {
    slug: "qaqc",
    name: "Quản lý chất lượng (QA/QC)",
    shortName: "QA/QC",
    description:
      "Kiểm soát chất lượng theo ITP, nghiệm thu và xử lý điểm không phù hợp.",
    icon: "✅",
    gradient: "from-teal-500 to-emerald-500",
    accent: {
      text: "text-teal-700 dark:text-teal-300",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      ring: "ring-teal-500/20",
    },
  },
  {
    slug: "hse",
    name: "An toàn lao động (HSE)",
    shortName: "An toàn",
    description:
      "An toàn - sức khỏe - môi trường: cấp phép, kiểm tra và ứng phó sự cố.",
    icon: "🦺",
    gradient: "from-red-500 to-orange-500",
    accent: {
      text: "text-red-700 dark:text-red-300",
      bg: "bg-red-50 dark:bg-red-500/10",
      ring: "ring-red-500/20",
    },
  },
  {
    slug: "estimating",
    name: "Dự toán - Đấu thầu",
    shortName: "Dự toán",
    description:
      "Bóc tách khối lượng, lập dự toán và chuẩn bị hồ sơ dự thầu.",
    icon: "🧮",
    gradient: "from-green-500 to-lime-500",
    accent: {
      text: "text-green-700 dark:text-green-300",
      bg: "bg-green-50 dark:bg-green-500/10",
      ring: "ring-green-500/20",
    },
  },
  {
    slug: "procurement",
    name: "Vật tư - Thiết bị",
    shortName: "Vật tư",
    description:
      "Mua sắm, nghiệm thu vật tư đầu vào và quản lý máy móc thiết bị công trường.",
    icon: "🚚",
    gradient: "from-purple-500 to-fuchsia-500",
    accent: {
      text: "text-purple-700 dark:text-purple-300",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      ring: "ring-purple-500/20",
    },
  },
  // --- Khối quản trị: pháp lý, chi phí, hợp đồng, đầu tư ---
  {
    slug: "legal",
    name: "Pháp lý",
    shortName: "Pháp lý",
    description:
      "Rà soát hợp đồng, tuân thủ pháp luật và quản lý rủi ro pháp lý dự án.",
    icon: "⚖️",
    gradient: "from-indigo-500 to-violet-500",
    accent: {
      text: "text-indigo-700 dark:text-indigo-300",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
      ring: "ring-indigo-500/20",
    },
  },
  {
    slug: "cost-control",
    name: "Kiểm soát chi phí",
    shortName: "KS chi phí",
    description:
      "So sánh dự toán với thực tế, kiểm soát phát sinh và dự báo chi phí hoàn thành.",
    icon: "📉",
    gradient: "from-yellow-500 to-amber-500",
    accent: {
      text: "text-yellow-700 dark:text-yellow-300",
      bg: "bg-yellow-50 dark:bg-yellow-500/10",
      ring: "ring-yellow-500/20",
    },
  },
  {
    slug: "contracts",
    name: "Quản lý hợp đồng",
    shortName: "Hợp đồng",
    description:
      "Quản lý điều khoản, mốc thanh toán, biến động khối lượng và hồ sơ claim.",
    icon: "📃",
    gradient: "from-slate-500 to-gray-500",
    accent: {
      text: "text-slate-700 dark:text-slate-300",
      bg: "bg-slate-100 dark:bg-slate-500/10",
      ring: "ring-slate-500/20",
    },
  },
  {
    slug: "investment",
    name: "Đầu tư",
    shortName: "Đầu tư",
    description:
      "Thẩm định hiệu quả, phân tích khả thi và ra quyết định đầu tư dự án.",
    icon: "📈",
    gradient: "from-emerald-500 to-green-500",
    accent: {
      text: "text-emerald-700 dark:text-emerald-300",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      ring: "ring-emerald-500/20",
    },
  },
];

const DEPARTMENT_MAP = new Map(DEPARTMENTS.map((d) => [d.slug, d]));

export function getDepartment(slug: string): Department | undefined {
  return DEPARTMENT_MAP.get(slug);
}
