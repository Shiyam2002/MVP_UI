// app/workspace/[workspaceId]/layout.tsx
import Sidebar03 from "@/src/components/sidebar-03";

export default function PersonalChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Sidebar03>{children}</Sidebar03>;
}
