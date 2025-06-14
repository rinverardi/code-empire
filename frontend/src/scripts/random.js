/**
 * Provides helper methods for generating random values.
 */

export class Random {
    #generate(length) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz012345';
        const integers = new Int8Array(length);

        crypto.getRandomValues(integers)

        return Array.from(integers, that => alphabet[that & 31]).join('');
    }

    /**
     * Generates a random identifier.
     *
     * @returns {string} the generated identifier
     */

    generateId() {
        return this.#generate(16);
    }

    /**
     * Generates a random secret.
     *
     * @returns {string} the generated secret
     */

    generateSecret() {
        return this.#generate(32);
    }

    /**
     * Picks a random entry from a hard-coded list of adjectives.
     *
     * @returns {string} the resulting adjective
     */

    pickAdjective() {
        const adjectives = [
            'Abandoned', 'Able', 'Absolute', 'Academic', 'Acceptable', 'Acclaimed', 'Accomplished', 'Accurate', 'Aching',
            'Acidic', 'Acrobatic', 'Active', 'Actual', 'Adept', 'Admirable', 'Admired', 'Adolescent', 'Adorable', 'Adored',
            'Advanced', 'Adventurous', 'Affectionate', 'Afraid', 'Aged', 'Aggravating', 'Aggressive', 'Agile', 'Agitated',
            'Agonizing', 'Agreeable', 'Ajar', 'Alarmed', 'Alarming', 'Alert', 'Alienated', 'Alive', 'All', 'Altruistic',
            'Amazing', 'Ambitious', 'Ample', 'Amused', 'Amusing', 'Anchored', 'Ancient', 'Angelic', 'Angry', 'Anguished',
            'Animated', 'Annual', 'Another', 'Antique', 'Anxious', 'Any', 'Apprehensive', 'Appropriate', 'Apt', 'Arctic',
            'Arid', 'Aromatic', 'Artistic', 'Ashamed', 'Assured', 'Astonishing', 'Athletic', 'Attached', 'Attentive',
            'Attractive', 'Austere', 'Authentic', 'Authorized', 'Automatic', 'Avaricious', 'Average', 'Aware', 'Awesome',
            'Awful', 'Awkward', 'Babyish', 'Back', 'Bad', 'Baggy', 'Bare', 'Barren', 'Basic', 'Beautiful', 'Belated',
            'Beloved', 'Beneficial', 'Best', 'Better', 'Bewitched', 'Big', 'Biodegradable', 'Bitter', 'Black', 'Bland',
            'Blank', 'Blaring', 'Bleak', 'Blind', 'Blissful', 'Blond', 'Blue', 'Blushing', 'Bogus', 'Boiling', 'Bold',
            'Bony', 'Boring', 'Bossy', 'Both', 'Bouncy', 'Bountiful', 'Bowed', 'Brave', 'Breakable', 'Brief', 'Bright',
            'Brilliant', 'Brisk', 'Broken', 'Bronze', 'Brown', 'Bruised', 'Bubbly', 'Bulky', 'Bumpy', 'Buoyant',
            'Burdensome', 'Burly', 'Bustling', 'Busy', 'Buttery', 'Buzzing', 'Calculating', 'Calm', 'Candid', 'Canine',
            'Capital', 'Carefree', 'Careful', 'Careless', 'Caring', 'Cautious', 'Cavernous', 'Celebrated', 'Charming',
            'Cheap', 'Cheerful', 'Cheery', 'Chief', 'Chilly', 'Chubby', 'Circular', 'Classic', 'Clean', 'Clear',
            'Clever', 'Close', 'Closed', 'Cloudy', 'Clueless', 'Clumsy', 'Cluttered', 'Coarse', 'Cold', 'Colorful',
            'Colorless', 'Colossal', 'Comfortable', 'Common', 'Compassionate', 'Competent', 'Complete', 'Complex',
            'Complicated', 'Composed', 'Concerned', 'Concrete', 'Confused', 'Conscious', 'Considerate', 'Constant',
            'Content', 'Conventional', 'Cooked', 'Cool', 'Cooperative', 'Coordinated', 'Corny', 'Corrupt', 'Costly',
            'Courageous', 'Courteous', 'Crafty', 'Crazy', 'Creamy', 'Creative', 'Creepy', 'Criminal', 'Crisp', 'Critical',
            'Crooked', 'Crowded', 'Cruel', 'Crushing', 'Cuddly', 'Cultivated', 'Cultured', 'Cumbersome', 'Curly', 'Curvy',
            'Cute', 'Cylindrical', 'Damaged', 'Damp', 'Dangerous', 'Dapper', 'Daring', 'Dark', 'Darling', 'Dazzling',
            'Dead', 'Deadly', 'Deafening', 'Dear', 'Dearest', 'Decent', 'Decimal', 'Decisive', 'Deep', 'Defenseless',
            'Defensive', 'Defiant', 'Deficient', 'Definite', 'Definitive', 'Delayed', 'Delectable', 'Delicious',
            'Delightful', 'Delirious', 'Demanding', 'Dense', 'Dental', 'Dependable', 'Dependent', 'Descriptive',
            'Deserted', 'Detailed', 'Determined', 'Devoted', 'Different', 'Difficult', 'Digital', 'Diligent', 'Dim',
            'Dimpled', 'Dimwitted', 'Direct', 'Dirty', 'Disastrous', 'Discrete', 'Disfigured', 'Disguised', 'Disgusting',
            'Dishonest', 'Disloyal', 'Dismal', 'Distant', 'Distinct', 'Distorted', 'Dizzy', 'Dopey', 'Doting', 'Double',
            'Downright', 'Drab', 'Drafty', 'Dramatic', 'Dreary', 'Droopy', 'Dry', 'Dual', 'Dull', 'Dutiful', 'Each', 'Eager',
            'Early', 'Earnest', 'Easy', 'Ecstatic', 'Edible', 'Educated', 'Elaborate', 'Elastic', 'Elated', 'Elderly',
            'Electric', 'Elegant', 'Elementary', 'Elliptical', 'Embarrassed', 'Embellished', 'Eminent', 'Emotional',
            'Empty', 'Enchanted', 'Enchanting', 'Energetic', 'Enlightened', 'Enormous', 'Enraged', 'Entire', 'Envious',
            'Equal', 'Equatorial', 'Essential', 'Esteemed', 'Ethical', 'Euphoric', 'Even', 'Evergreen', 'Everlasting',
            'Every', 'Evil', 'Exalted', 'Excellent', 'Excitable', 'Excited', 'Exciting', 'Exemplary', 'Exhausted',
            'Exotic', 'Expensive', 'Experienced', 'Expert', 'Extraneous', 'Extroverted', 'Fabulous', 'Failing', 'Faint',
            'Fair', 'Faithful', 'Fake', 'False', 'Familiar', 'Famous', 'Fancy', 'Fantastic', 'Far', 'Faraway', 'Fast',
            'Fat', 'Fatal', 'Fatherly', 'Favorable', 'Favorite', 'Fearful', 'Fearless', 'Feisty', 'Feline', 'Female',
            'Feminine', 'Few', 'Fickle', 'Filthy', 'Fine', 'Finished', 'Firm', 'First', 'Firsthand', 'Fitting', 'Fixed',
            'Flaky', 'Flamboyant', 'Flashy', 'Flat', 'Flawed', 'Flawless', 'Flickering', 'Flimsy', 'Flippant', 'Flowery',
            'Fluffy', 'Fluid', 'Flustered', 'Focused', 'Fond', 'Foolhardy', 'Foolish', 'Forceful', 'Forked', 'Formal',
            'Forsaken', 'Forthright', 'Fortunate', 'Fragrant', 'Frail', 'Frank', 'Frayed', 'Free', 'French', 'Frequent',
            'Fresh', 'Friendly', 'Frightened', 'Frightening', 'Frigid', 'Frilly', 'Frivolous', 'Frizzy', 'Front', 'Frosty',
            'Frozen', 'Frugal', 'Fruitful', 'Full', 'Fumbling', 'Functional', 'Funny', 'Fussy', 'Fuzzy', 'Gargantuan',
            'Gaseous', 'General', 'Generous', 'Gentle', 'Genuine', 'Giant', 'Giddy', 'Gifted', 'Gigantic', 'Giving',
            'Glamorous', 'Glaring', 'Glass', 'Gleaming', 'Gleeful', 'Glistening', 'Glittering', 'Gloomy', 'Glorious',
            'Glossy', 'Glum', 'Golden', 'Good', 'Gorgeous', 'Graceful', 'Gracious', 'Grand', 'Grandiose', 'Granular',
            'Grateful', 'Grave', 'Gray', 'Great', 'Greedy', 'Green', 'Gregarious', 'Grim', 'Grimy', 'Gripping', 'Grizzled',
            'Gross', 'Grotesque', 'Grouchy', 'Grounded', 'Growing', 'Growling', 'Grown', 'Grubby', 'Gruesome', 'Grumpy',
            'Guilty', 'Gullible', 'Gummy', 'Hairy', 'Half', 'Handmade', 'Handsome', 'Handy', 'Happy', 'Hard', 'Harmful',
            'Harmless', 'Harmonious', 'Harsh', 'Hasty', 'Hateful', 'Haunting', 'Healthy', 'Heartfelt', 'Hearty', 'Heavenly',
            'Heavy', 'Hefty', 'Helpful', 'Helpless', 'Hidden', 'Hideous', 'High', 'Hilarious', 'Hoarse', 'Hollow', 'Homely',
            'Honest', 'Honorable', 'Honored', 'Hopeful', 'Horrible', 'Hospitable', 'Hot', 'Huge', 'Humble', 'Humiliating',
            'Humming', 'Humongous', 'Hungry', 'Hurtful', 'Husky', 'Icky', 'Icy', 'Ideal', 'Idealistic', 'Identical',
            'Idiotic', 'Idle', 'Idolized', 'Ignorant', 'Ill', 'Illegal', 'Illiterate', 'Illustrious', 'Imaginary',
            'Imaginative', 'Immaculate', 'Immaterial', 'Immediate', 'Immense', 'Impartial', 'Impassioned', 'Impeccable',
            'Imperfect', 'Imperturbable', 'Impish', 'Impolite', 'Important', 'Impossible', 'Impractical', 'Impressionable',
            'Impressive', 'Improbable', 'Impure', 'Inborn', 'Incomparable', 'Incompatible', 'Incomplete', 'Inconsequential',
            'Incredible', 'Indelible', 'Indolent', 'Inexperienced', 'Infamous', 'Infantile', 'Infatuated', 'Inferior',
            'Infinite', 'Informal', 'Innocent', 'Insecure', 'Insidious', 'Insignificant', 'Insistent', 'Instructive',
            'Insubstantial', 'Intelligent', 'Intent', 'Intentional', 'Interesting', 'Internal', 'International', 'Intrepid',
            'Ironclad', 'Irresponsible', 'Irritating', 'Itchy', 'Jaded', 'Jagged', 'Jaunty', 'Jealous', 'Jittery', 'Joint',
            'Jolly', 'Jovial', 'Joyful', 'Joyous', 'Jubilant', 'Judicious', 'Juicy', 'Jumbo', 'Jumpy', 'Junior', 'Juvenile',
            'Kaleidoscopic', 'Keen', 'Key', 'Kind', 'Kindhearted', 'Kindly', 'Klutzy', 'Knobby', 'Knotty', 'Knowing',
            'Knowledgeable', 'Known', 'Kooky', 'Kosher', 'Lame', 'Lanky', 'Large', 'Last', 'Lasting', 'Late', 'Lavish',
            'Lawful', 'Lazy', 'Leading', 'Leafy', 'Lean', 'Left', 'Legal', 'Legitimate', 'Light', 'Lighthearted', 'Likable',
            'Likely', 'Limited', 'Limp', 'Limping', 'Linear', 'Lined', 'Liquid', 'Little', 'Live', 'Lively', 'Livid',
            'Loathsome', 'Lone', 'Lonely', 'Long', 'Loose', 'Lopsided', 'Lost', 'Loud', 'Lovable', 'Lovely', 'Loving',
            'Low', 'Loyal', 'Lucky', 'Lumbering', 'Luminous', 'Lumpy', 'Lustrous', 'Luxurious', 'Mad', 'Magnificent',
            'Majestic', 'Major', 'Male', 'Mammoth', 'Married', 'Marvelous', 'Masculine', 'Massive', 'Mature', 'Meager',
            'Mealy', 'Mean', 'Measly', 'Meaty', 'Medical', 'Mediocre', 'Medium', 'Meek', 'Mellow', 'Melodic', 'Memorable',
            'Menacing', 'Merry', 'Messy', 'Metallic', 'Mild', 'Milky', 'Mindless', 'Miniature', 'Minor', 'Minty', 'Miserable',
            'Miserly', 'Misguided', 'Misty', 'Mixed', 'Modern', 'Modest', 'Moist', 'Monstrous', 'Monthly', 'Monumental',
            'Moral', 'Mortified', 'Motherly', 'Motionless', 'Mountainous', 'Muddy', 'Muffled', 'Multicolored', 'Mundane',
            'Murky', 'Mushy', 'Musty', 'Muted', 'Mysterious', 'Naive', 'Narrow', 'Nasty', 'Natural', 'Naughty', 'Nautical',
            'Near', 'Neat', 'Necessary', 'Needy', 'Negative', 'Neglected', 'Negligible', 'Neighboring', 'Nervous', 'New',
            'Next', 'Nice', 'Nifty', 'Nimble', 'Nippy', 'Nocturnal', 'Noisy', 'Nonstop', 'Normal', 'Notable', 'Noted',
            'Noteworthy', 'Novel', 'Noxious', 'Numb', 'Nutritious', 'Nutty', 'Obedient', 'Obese', 'Oblong', 'Obvious',
            'Occasional', 'Odd', 'Oddball', 'Offbeat', 'Offensive', 'Official', 'Oily', 'Old', 'Only', 'Open', 'Optimal',
            'Optimistic', 'Opulent', 'Orange', 'Orderly', 'Ordinary', 'Organic', 'Original', 'Ornate', 'Ornery', 'Other',
            'Our', 'Outgoing', 'Outlandish', 'Outlying', 'Outrageous', 'Outstanding', 'Oval', 'Overcooked', 'Overdue',
            'Overjoyed', 'Overlooked', 'Palatable', 'Pale', 'Paltry', 'Parallel', 'Parched', 'Partial', 'Passionate',
            'Past', 'Pastel', 'Peaceful', 'Peppery', 'Perfect', 'Perfumed', 'Periodic', 'Perky', 'Personal', 'Pertinent',
            'Pesky', 'Pessimistic', 'Petty', 'Phony', 'Physical', 'Piercing', 'Pink', 'Pitiful', 'Plain', 'Plaintive',
            'Plastic', 'Playful', 'Pleasant', 'Pleased', 'Pleasing', 'Plump', 'Plush', 'Pointed', 'Pointless', 'Poised',
            'Polished', 'Polite', 'Political', 'Poor', 'Popular', 'Portly', 'Posh', 'Positive', 'Possible', 'Potable',
            'Powerful', 'Powerless', 'Practical', 'Precious', 'Present', 'Prestigious', 'Pretty', 'Previous', 'Pricey',
            'Prickly', 'Primary', 'Prime', 'Pristine', 'Private', 'Probable', 'Productive', 'Profitable', 'Profuse',
            'Proper', 'Proud', 'Prudent', 'Punctual', 'Pungent', 'Puny', 'Pure', 'Purple', 'Pushy', 'Putrid', 'Puzzled',
            'Puzzling', 'Quaint', 'Qualified', 'Quarrelsome', 'Quarterly', 'Queasy', 'Querulous', 'Questionable', 'Quick',
            'Quiet', 'Quintessential', 'Quirky', 'Quixotic', 'Quizzical', 'Radiant', 'Ragged', 'Rapid', 'Rare', 'Rash',
            'Raw', 'Ready', 'Real', 'Realistic', 'Reasonable', 'Recent', 'Reckless', 'Rectangular', 'Red', 'Reflecting',
            'Regal', 'Regular', 'Reliable', 'Relieved', 'Remarkable', 'Remorseful', 'Remote', 'Repentant', 'Repulsive',
            'Required', 'Respectful', 'Responsible', 'Revolving', 'Rewarding', 'Rich', 'Right', 'Rigid', 'Ringed', 'Ripe',
            'Roasted', 'Robust', 'Rosy', 'Rotating', 'Rotten', 'Rough', 'Round', 'Rowdy', 'Royal', 'Rubbery', 'Ruddy',
            'Rude', 'Rundown', 'Runny', 'Rural', 'Rusty', 'Sad', 'Safe', 'Salty', 'Same', 'Sandy', 'Sane', 'Sarcastic',
            'Sardonic', 'Satisfied', 'Scaly', 'Scarce', 'Scared', 'Scary', 'Scented', 'Scholarly', 'Scientific',
            'Scornful', 'Scratchy', 'Scrawny', 'Second', 'Secondary', 'Secret', 'Selfish', 'Sentimental', 'Separate',
            'Serene', 'Serious', 'Serpentine', 'Several', 'Severe', 'Shabby', 'Shadowy', 'Shady', 'Shallow', 'Shameful',
            'Shameless', 'Sharp', 'Shimmering', 'Shiny', 'Shocked', 'Shocking', 'Shoddy', 'Short', 'Showy', 'Shrill',
            'Shy', 'Sick', 'Silent', 'Silky', 'Silly', 'Silver', 'Similar', 'Simple', 'Simplistic', 'Sinful', 'Single',
            'Sizzling', 'Skeletal', 'Skinny', 'Sleepy', 'Slight', 'Slim', 'Slimy', 'Slippery', 'Slow', 'Slushy', 'Small',
            'Smart', 'Smoggy', 'Smooth', 'Smug', 'Snappy', 'Snarling', 'Sneaky', 'Sniveling', 'Snoopy', 'Sociable',
            'Soft', 'Soggy', 'Solid', 'Somber', 'Some', 'Sophisticated', 'Sore', 'Sorrowful', 'Soulful', 'Soupy', 'Sour',
            'Spanish', 'Sparkling', 'Sparse', 'Specific', 'Spectacular', 'Speedy', 'Spherical', 'Spicy', 'Spiffy',
            'Spirited', 'Spiteful', 'Splendid', 'Spotless', 'Spotted', 'Spry', 'Square', 'Squeaky', 'Squiggly', 'Stable',
            'Staid', 'Stained', 'Stale', 'Standard', 'Starchy', 'Stark', 'Starry', 'Steel', 'Steep', 'Sticky', 'Stiff',
            'Stimulating', 'Stingy', 'Stormy', 'Straight', 'Strange', 'Strict', 'Strident', 'Striking', 'Striped', 'Strong',
            'Studious', 'Stunning', 'Stupendous', 'Stupid', 'Sturdy', 'Stylish', 'Subdued', 'Submissive', 'Substantial',
            'Subtle', 'Suburban', 'Sudden', 'Sugary', 'Sunny', 'Super', 'Superb', 'Superficial', 'Superior', 'Supportive',
            'Surprised', 'Suspicious', 'Svelte', 'Sweaty', 'Sweet', 'Sweltering', 'Swift', 'Sympathetic', 'Talkative',
            'Tall', 'Tame', 'Tan', 'Tangible', 'Tart', 'Tasty', 'Tattered', 'Taut', 'Tedious', 'Teeming', 'Tempting',
            'Tender', 'Tense', 'Tepid', 'Terrible', 'Terrific', 'Testy', 'Thankful', 'That', 'These', 'Thick', 'Thin',
            'Third', 'Thirsty', 'This', 'Thorny', 'Thorough', 'Those', 'Thoughtful', 'Threadbare', 'Thrifty', 'Thunderous',
            'Tidy', 'Tight', 'Timely', 'Tinted', 'Tiny', 'Tired', 'Torn', 'Total', 'Tough', 'Tragic', 'Trained',
            'Traumatic', 'Treasured', 'Tremendous', 'Triangular', 'Tricky', 'Trifling', 'Trim', 'Trivial', 'Troubled',
            'True', 'Trusting', 'Trustworthy', 'Trusty', 'Truthful', 'Tubby', 'Turbulent', 'Twin', 'Ugly', 'Ultimate',
            'Unacceptable', 'Unaware', 'Uncomfortable', 'Uncommon', 'Unconscious', 'Understated', 'Unequaled', 'Uneven',
            'Unfinished', 'Unfit', 'Unfolded', 'Unfortunate', 'Unhappy', 'Unhealthy', 'Uniform', 'Unimportant', 'Unique',
            'United', 'Unkempt', 'Unknown', 'Unlawful', 'Unlined', 'Unlucky', 'Unnatural', 'Unpleasant', 'Unrealistic',
            'Unripe', 'Unruly', 'Unselfish', 'Unsightly', 'Unsteady', 'Unsung', 'Untidy', 'Untimely', 'Untried', 'Untrue',
            'Unused', 'Unusual', 'Unwelcome', 'Unwieldy', 'Unwilling', 'Unwitting', 'Unwritten', 'Upbeat', 'Upright',
            'Upset', 'Urban', 'Usable', 'Used', 'Useful', 'Useless', 'Utilized', 'Utter', 'Vacant', 'Vague', 'Vain',
            'Valid', 'Valuable', 'Vapid', 'Variable', 'Vast', 'Velvety', 'Venerated', 'Vengeful', 'Verifiable', 'Vibrant',
            'Vicious', 'Victorious', 'Vigilant', 'Vigorous', 'Villainous', 'Violent', 'Violet', 'Virtual', 'Virtuous',
            'Visible', 'Vital', 'Vivacious', 'Vivid', 'Voluminous', 'Wan', 'Warlike', 'Warm', 'Warmhearted', 'Warped',
            'Wary', 'Wasteful', 'Watchful', 'Waterlogged', 'Watery', 'Wavy', 'Weak', 'Wealthy', 'Weary', 'Webbed', 'Wee',
            'Weekly', 'Weepy', 'Weighty', 'Weird', 'Welcome', 'Wet', 'Which', 'Whimsical', 'Whirlwind', 'Whispered',
            'White', 'Whole', 'Whopping', 'Wicked', 'Wide', 'Wiggly', 'Wild', 'Willing', 'Wilted', 'Winding', 'Windy',
            'Winged', 'Wiry', 'Wise', 'Witty', 'Wobbly', 'Woeful', 'Wonderful', 'Wooden', 'Woozy', 'Wordy', 'Worldly',
            'Worn', 'Worried', 'Worrisome', 'Worse', 'Worst', 'Worthless', 'Worthwhile', 'Worthy', 'Wrathful', 'Wretched',
            'Writhing', 'Wrong', 'Wry', 'Yawning', 'Yearly', 'Yellow', 'Yellowish', 'Young', 'Youthful', 'Yummy', 'Zany',
            'Zealous', 'Zesty', 'Zigzag'];

        return adjectives[Math.floor(Math.random() * adjectives.length)];
    }

    /**
     * Picks a random entry from a hard-coded list of animals.
     *
     * @returns {string} the resulting animal
     */

    pickAnimal() {
        const animals = [
            'Aardvark', 'Aardwolf', 'Albatross', 'Alligator', 'Alpaca', 'Amphibian', 'Anaconda', 'Angelfish', 'Anglerfish',
            'Ant', 'Anteater', 'Antelope', 'Antlion', 'Ape', 'Aphid', 'Armadillo', 'Asp', 'Baboon', 'Badger', 'Bandicoot',
            'Barnacle', 'Barracuda', 'Basilisk', 'Bass', 'Bat', 'Bear', 'Beaver', 'Bedbug', 'Bee', 'Beetle', 'Bird',
            'Bison', 'Blackbird', 'Boa', 'Boar', 'Bobcat', 'Bobolink', 'Bonobo', 'Booby', 'Bovid', 'Buffalo', 'Bug',
            'Butterfly', 'Buzzard', 'Camel', 'Canary', 'Canid', 'Canidae', 'Capybara', 'Cardinal', 'Caribou', 'Carp', 'Cat',
            'Caterpillar', 'Catfish', 'Catshark', 'Cattle', 'Centipede', 'Cephalopod', 'Chameleon', 'Cheetah', 'Chickadee',
            'Chicken', 'Chimpanzee', 'Chinchilla', 'Chipmunk', 'Cicada', 'Clam', 'Clownfish', 'Cobra', 'Cockroach', 'Cod',
            'Condor', 'Constrictor', 'Coral', 'Cougar', 'Cow', 'Coyote', 'Crab', 'Crane', 'Crawdad', 'Crayfish', 'Cricket',
            'Crocodile', 'Crow', 'Cuckoo', 'Damselfly', 'Deer', 'Dingo', 'Dinosaur', 'Dog', 'Dolphin', 'Donkey', 'Dormouse',
            'Dove', 'Dragon', 'Dragonfly', 'Duck', 'Eagle', 'Earthworm', 'Earwig', 'Echidna', 'Eel', 'Egret', 'Elephant',
            'Elk', 'Emu', 'Ermine', 'Falcon', 'Felidae', 'Ferret', 'Finch', 'Firefly', 'Fish', 'Flamingo', 'Flea', 'Fly',
            'Fowl', 'Fox', 'Frog', 'Galliform', 'Gamefowl', 'Gayal', 'Gazelle', 'Gecko', 'Gerbil', 'Gibbon', 'Giraffe',
            'Goat', 'Goldfish', 'Goose', 'Gopher', 'Gorilla', 'Grasshopper', 'Grouse', 'Guan', 'Guanaco', 'Guineafowl',
            'Gull', 'Guppy', 'Haddock', 'Halibut', 'Hamster', 'Hare', 'Harrier', 'Hawk', 'Hedgehog', 'Heron', 'Herring',
            'Hippopotamus', 'Hookworm', 'Hornet', 'Horse', 'Hoverfly', 'Hummingbird', 'Hyena', 'Iguana', 'Impala', 'Jackal',
            'Jaguar', 'Jay', 'Jellyfish', 'Kangaroo', 'Kite', 'Kiwi', 'Koala', 'Koi', 'Krill', 'Ladybug', 'Lamprey',
            'Landfowl', 'Lark', 'Leech', 'Lemming', 'Lemur', 'Leopard', 'Leopon', 'Limpet', 'Lion', 'Lizard', 'Llama',
            'Lobster', 'Locust', 'Loon', 'Louse', 'Lynx', 'Macaw', 'Mackerel', 'Magpie', 'Mammal', 'Manatee', 'Mandrill',
            'Mantis', 'Marlin', 'Marmoset', 'Marmot', 'Marsupial', 'Marten', 'Mastodon', 'Meadowlark', 'Meerkat', 'Mink',
            'Minnow', 'Mite', 'Mockingbird', 'Mole', 'Mollusk', 'Mongoose', 'Monkey', 'Moose', 'Mosquito', 'Moth', 'Mouse',
            'Mule', 'Narwhal', 'Newt', 'Nightingale', 'Ocelot', 'Octopus', 'Opossum', 'Orangutan', 'Orca', 'Ostrich',
            'Otter', 'Owl', 'Ox', 'Panda', 'Panther', 'Parakeet', 'Parrot', 'Partridge', 'Peacock', 'Peafowl', 'Pelican',
            'Penguin', 'Perch', 'Pheasant', 'Pig', 'Pigeon', 'Pike', 'Pinniped', 'Piranha', 'Planarian', 'Platypus',
            'Pony', 'Porcupine', 'Porpoise', 'Possum', 'Prawn', 'Primate', 'Ptarmigan', 'Puffin', 'Puma', 'Python', 'Quail',
            'Quelea', 'Quokka', 'Rabbit', 'Raccoon', 'Rat', 'Rattlesnake', 'Raven', 'Reindeer', 'Rhinoceros', 'Roadrunner',
            'Rodent', 'Rook', 'Rooster', 'Roundworm', 'Salamander', 'Salmon', 'Scallop', 'Scorpion', 'Seahorse', 'Seal',
            'Shark', 'Sheep', 'Shrew', 'Shrimp', 'Silkmoth', 'Silkworm', 'Silverfish', 'Skink', 'Skunk', 'Sloth', 'Slug',
            'Smelt', 'Snail', 'Snake', 'Snipe', 'Sole', 'Sparrow', 'Spider', 'Spoonbill', 'Squid', 'Squirrel', 'Starfish',
            'Stingray', 'Stoat', 'Stork', 'Sturgeon', 'Swallow', 'Swan', 'Swift', 'Tahr', 'Takin', 'Tapir', 'Tarantula',
            'Tarsier', 'Termite', 'Tern', 'Thrush', 'Tick', 'Tiger', 'Toad', 'Tortoise', 'Toucan', 'Trout', 'Tuna',
            'Turkey', 'Turtle', 'Tyrannosaurus', 'Urial', 'Vicuna', 'Viper', 'Vole', 'Vulture', 'Wallaby', 'Walrus',
            'Warbler', 'Wasp', 'Weasel', 'Whale', 'Whippet', 'Wolf', 'Wolverine', 'Wombat', 'Woodpecker', 'Worm', 'Yak',
            'Zebra'];

        return animals[Math.floor(Math.random() * animals.length)];
    }
};
