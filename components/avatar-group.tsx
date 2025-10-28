import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function AvatarGroup() {
    const avatars = [
        { name: "Sarah Johnson", initials: "SJ", bgColor: "bg-red-500" },
        { name: "Michael Chen", initials: "MC", bgColor: "bg-blue-500" },
        { name: "Emily Rodriguez", initials: "ER", bgColor: "bg-green-500" },
        { name: "David Kim", initials: "DK", bgColor: "bg-purple-500" },
        { name: "Lisa Thompson", initials: "LT", bgColor: "bg-orange-500" },
    ];

    return (
        <div className="flex -space-x-2">
            {avatars.map((avatar, index) => (
                <Avatar key={index} className=" hover:z-10">
                    <AvatarFallback className={`${avatar.bgColor} text-white font-semibold text-sm`}>
                        {avatar.initials}
                    </AvatarFallback>
                </Avatar>
            ))}
            <Button
                variant="secondary"
                className="relative size-10 border-2 border-white rounded-full hover:z-10 bg-gray-100 text-gray-600 font-semibold"
            >
                +
            </Button>
        </div>
    );
}
