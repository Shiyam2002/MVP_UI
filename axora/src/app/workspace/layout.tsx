// app/workspace/[workspaceId]/layout.tsx
import Sidebar03 from "@/src/components/sidebar-03/index";

export default function WorkspaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Sidebar03>{children}</Sidebar03>;
}
