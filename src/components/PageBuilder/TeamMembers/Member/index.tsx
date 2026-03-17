'use client';

// Imports
// ------------
import Image from 'next/image';
import IconButton from '@parts/IconButton';
import Frame from '@parts/Frame';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Member = ({ name, role, linkedinUrl, email, image }: I.MemberProps) => {
	return (
		<S.Jacket>
			<S.Picture>
				<Image
					src={image.url}
					alt={image.alt}
					fill
					sizes='100vw, (min-width: 1024px) 66vw'
					blurDataURL={image.blur}
					placeholder='blur'
					loading='eager'
					priority={true}
					fetchPriority='high'
				/>
			</S.Picture>

			<S.Details>
				<S.Left>
					<h3>{name}</h3>
					<h4>{role}</h4>
				</S.Left>

				{(linkedinUrl || email) && (
					<S.Right>
						{linkedinUrl && (
							<IconButton
								icon='linkedin'
								to={linkedinUrl}
								ariaLabel={`Connect with ${name} on LinkedIn`}
							/>
						)}
						{email && (
							<IconButton
								icon='mail'
								to={`mailto:${email}`}
								ariaLabel={`Email ${name}`}
							/>
						)}
					</S.Right>
				)}
			</S.Details>

			<Frame className='bottom' isLight />
		</S.Jacket>
	);
};

// Exports
// ------------
Member.displayName = 'Member';
export default Member;
